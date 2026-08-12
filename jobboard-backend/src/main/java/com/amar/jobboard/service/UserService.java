package com.amar.jobboard.service;

import com.amar.jobboard.dto.LoginRequest;
import com.amar.jobboard.dto.LoginResponse;
import com.amar.jobboard.dto.RegisterRequest;
import com.amar.jobboard.dto.UserResponse;

public interface UserService {

    UserResponse registerUser(RegisterRequest request);

    LoginResponse loginUser(LoginRequest request);
}