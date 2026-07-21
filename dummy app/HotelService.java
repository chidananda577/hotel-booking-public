package com.test.hotelbooking.service;

import com.test.hotelbooking.model.Hotel;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class HotelService {

    public List<Hotel> getAllHotels() {
        return Arrays.asList(
                new Hotel(1L, "Marriott", "Bangalore", 5000),
                new Hotel(2L, "Taj", "Mumbai", 7000)
        );
    }
}