package com.flight.mapper;

import com.flight.dto.response.UserResponse;
import com.flight.entity.User;

public class UserMapper {

    public static User toEntity(String name, String email, String password) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        return user;
    }
    
    public static UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().getName()
        );
    }
}