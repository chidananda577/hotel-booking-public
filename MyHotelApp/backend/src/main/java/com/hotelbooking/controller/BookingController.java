package com.hotelbooking.controller;

import com.hotelbooking.dto.BookingRequest;
import com.hotelbooking.dto.BookingResponse;
import com.hotelbooking.security.UserPrincipal;
import com.hotelbooking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication) {

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        BookingResponse response = bookingService.createBooking(principal.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getUserBookings(Authentication authentication) {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        List<BookingResponse> bookings = bookingService.getUserBookings(principal.getUserId());
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        bookingService.cancelBooking(id, principal.getUserId());
        return ResponseEntity.noContent().build();
    }
}
