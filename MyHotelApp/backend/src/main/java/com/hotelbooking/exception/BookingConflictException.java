package com.hotelbooking.exception;

public class BookingConflictException extends RuntimeException {

    public BookingConflictException(String message) {
        super(message);
    }
}
