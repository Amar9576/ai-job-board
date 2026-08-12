package com.amar.jobboard.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.amar.jobboard.dto.LoginRequest;
import com.amar.jobboard.dto.LoginResponse;
import com.amar.jobboard.dto.RegisterRequest;
import com.amar.jobboard.dto.UserResponse;
import com.amar.jobboard.entity.User;
import com.amar.jobboard.exception.EmailAlreadyExistException;
import com.amar.jobboard.mapper.UserMapper;
import com.amar.jobboard.repository.UserRepository;
import com.amar.jobboard.security.JwtService;
import com.amar.jobboard.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;


    @Override
    public UserResponse registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new EmailAlreadyExistException(
                    "Email already exists"
            );
        }

        User user = userMapper.toEntity(request);

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }


    @Override
    public LoginResponse loginUser(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token =
                jwtService.generateToken(request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return LoginResponse.builder()
                .token(token)
                .userId(user.getId())
                .role(user.getRole().name())
                .message("Login Successful")
                .build();
    }
}