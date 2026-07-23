package com.hotelbooking.service;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> searchHotels(String query) {
        if (query == null || query.trim().isEmpty()) {
            return hotelRepository.findAll();
        }
        return hotelRepository.searchHotels(query.trim());
    }

    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }
}
