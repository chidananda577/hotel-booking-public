package com.hotelbooking.service;

import com.hotelbooking.dto.BookingRequest;
import com.hotelbooking.dto.BookingResponse;
import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Hotel;
import com.hotelbooking.exception.BookingConflictException;
import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public BookingResponse createBooking(Long userId, BookingRequest request) {
        if (request.getCheckOut().isBefore(request.getCheckIn()) ||
            request.getCheckOut().isEqual(request.getCheckIn())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }

        Hotel hotel = hotelRepository.findById(request.getHotelId())
            .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));

        List<Booking> overlapping = bookingRepository.findOverlappingBookings(
            request.getHotelId(),
            request.getCheckIn(),
            request.getCheckOut()
        );

        if (!overlapping.isEmpty()) {
            throw new BookingConflictException("This hotel is already booked for the selected dates");
        }

        Booking booking = new Booking(userId, request.getHotelId(), request.getCheckIn(), request.getCheckOut());
        booking = bookingRepository.save(booking);

        return new BookingResponse(
            booking.getId(),
            booking.getUserId(),
            booking.getHotelId(),
            hotel.getName(),
            booking.getCheckIn(),
            booking.getCheckOut(),
            booking.getStatus(),
            booking.getCreatedAt()
        );
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);

        return bookings.stream().map(booking -> {
            Hotel hotel = hotelRepository.findById(booking.getHotelId())
                .orElse(null);
            String hotelName = hotel != null ? hotel.getName() : "Unknown Hotel";

            return new BookingResponse(
                booking.getId(),
                booking.getUserId(),
                booking.getHotelId(),
                hotelName,
                booking.getCheckIn(),
                booking.getCheckOut(),
                booking.getStatus(),
                booking.getCreatedAt()
            );
        }).collect(Collectors.toList());
    }

    public void cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You can only cancel your own bookings");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
}
