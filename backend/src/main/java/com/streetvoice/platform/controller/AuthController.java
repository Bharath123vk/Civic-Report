package com.streetvoice.platform.controller;

import com.streetvoice.platform.dto.AuthenticationResponseDTO;
import com.streetvoice.platform.dto.LoginRequestDTO;
import com.streetvoice.platform.dto.UserRegistrationDTO;
import com.streetvoice.platform.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for User Registration and Login")
public class AuthController {

    private final UserService userService;

    // Register user
    @PostMapping("/register")
    @Operation(summary = "Register a new User", description = "Creates a new CivicSense user account and generates an immediate JWT Token")
    public ResponseEntity<AuthenticationResponseDTO> registerUser(@Valid @RequestBody UserRegistrationDTO dto) {
        return ResponseEntity.ok(userService.register(dto));
    }

    // Login user
    @PostMapping("/login")
    @Operation(summary = "Login existing User", description = "Authenticates credentials against BCrypt records and securely provisions a JWT Token")
    public ResponseEntity<AuthenticationResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(userService.login(dto));
    }
}