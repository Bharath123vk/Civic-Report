package com.streetvoice.platform.controller;

import com.streetvoice.platform.dto.AuthenticationResponseDTO;
import com.streetvoice.platform.dto.LoginRequestDTO;
import com.streetvoice.platform.dto.UserRegistrationDTO;
import com.streetvoice.platform.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> registerUser(@RequestBody UserRegistrationDTO dto) {
        return ResponseEntity.ok(userService.register(dto));
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> loginUser(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(userService.login(dto));
    }
}