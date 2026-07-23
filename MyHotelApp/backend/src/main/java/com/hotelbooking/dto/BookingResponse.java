package com.hotelbooking.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {

    private Long id;
    private Long userId;
    private Long hotelId;
    private String hotelName;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String status;
    private LocalDateTime createdAt;

    public BookingResponse() {}

    public BookingResponse(Long id, Long userId, Long hotelId, String hotelName,
                          LocalDate checkIn, LocalDate checkOut, String status, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
