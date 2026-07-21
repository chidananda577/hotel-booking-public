package com.test.hotelbooking.service;

import com.test.hotelbooking.model.Booking;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    public Booking createBooking(Booking booking) {
        booking.setBookingId(1001L);
        return booking;
    }

    public Booking getBooking(Long bookingId) {
        return new Booking(
                bookingId,
                "John Doe",
                1L,
                "2026-08-01",
                "2026-08-05"
        );
    }
}