package com.hotelbooking.controller;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<Hotel>> searchHotels(@RequestParam(required = false) String query) {
        List<Hotel> hotels = hotelService.searchHotels(query);
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        return ResponseEntity.ok(hotel);
    }
}
