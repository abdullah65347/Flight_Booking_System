package com.flight.controller;

import com.flight.dto.response.UserResponse;
import com.flight.mapper.UserMapper;
import com.flight.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	@Autowired
	private UserService userService;

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<UserResponse>> getAllUsers() {

		List<UserResponse> users = userService.getAllUsers().stream().map(UserMapper::toResponse)
				.collect(Collectors.toList());

		return ResponseEntity.ok(users);
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {

		UserResponse user = UserMapper.toResponse(userService.getUserById(id));

		return ResponseEntity.ok(user);
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {

		userService.deleteUser(id);
		return ResponseEntity.ok("User deleted successfully");
	}
}