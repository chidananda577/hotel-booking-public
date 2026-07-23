package com.hotelbooking.service;

import com.hotelbooking.dto.LoginRequest;
import com.hotelbooking.dto.LoginResponse;
import com.hotelbooking.dto.RegisterRequest;
import com.hotelbooking.dto.UserResponse;
import com.hotelbooking.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    public UserResponse register(RegisterRequest request) {
        User user = userService.createUser(
            request.getName(),
            request.getEmail(),
            request.getPassword()
        );

        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }

    public LoginResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!userService.validatePassword(user, request.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getId(), user.getRole());
        long expiresIn = jwtService.getExpirationTime();

        UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail());

        return new LoginResponse(token, expiresIn, userResponse);
    }
}
