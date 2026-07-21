package com.test.hotelbooking.model;

public class Hotel {

    private Long id;
    private String name;
    private String city;
    private double pricePerNight;

    public Hotel() {}

    public Hotel(Long id, String name, String city, double pricePerNight) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.pricePerNight = pricePerNight;
    }

    // Getters and Setters
}