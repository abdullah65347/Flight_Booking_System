package com.flight.service;

import com.flight.dto.request.LoginRequest;
import com.flight.dto.request.RegisterRequest;
import com.flight.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}