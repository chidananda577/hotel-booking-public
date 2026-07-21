package com.test.hotelbooking.model;

public class Booking {

    private Long bookingId;
    private String customerName;
    private Long hotelId;
    private String checkInDate;
    private String checkOutDate;

    public Booking() {}

    public Booking(Long bookingId, String customerName,
                   Long hotelId, String checkInDate,
                   String checkOutDate) {
        this.bookingId = bookingId;
        this.customerName = customerName;
        this.hotelId = hotelId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }

    // Getters and Setters
}