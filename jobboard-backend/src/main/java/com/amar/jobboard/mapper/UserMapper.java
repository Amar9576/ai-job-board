package com.amar.jobboard.mapper;

import org.springframework.stereotype.Component;

import com.amar.jobboard.dto.RegisterRequest;
import com.amar.jobboard.dto.UserResponse;
import com.amar.jobboard.entity.User;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest request) {

        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .role(request.getRole())
                .build();
    }

    public UserResponse toResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}