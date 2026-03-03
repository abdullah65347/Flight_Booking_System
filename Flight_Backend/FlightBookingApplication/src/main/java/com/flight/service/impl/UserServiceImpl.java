package com.flight.service.impl;

import com.flight.entity.User;
import com.flight.exception.ResourceNotFoundException;
import com.flight.repository.UserRepository;
import com.flight.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {

        User user = getUserById(id);
        userRepository.delete(user);
    }
}