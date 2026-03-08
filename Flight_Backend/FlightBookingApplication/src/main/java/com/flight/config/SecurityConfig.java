package com.flight.config;

import com.flight.security.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                	    .requestMatchers(
                	        "/api/auth/**",
                	        "/v3/api-docs/**",
                	        "/swagger-ui/**",
                	        "/swagger-ui.html"
                	    ).permitAll()
                	    .requestMatchers(HttpMethod.GET, "/api/flights", "/api/flights/**").permitAll()  // ADD THIS
                	    .requestMatchers("/api/users/**").hasAuthority("ROLE_ADMIN")
                	    .requestMatchers("/api/flights/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
                	    .requestMatchers("/api/bookings/**").authenticated()
                	    .anyRequest().authenticated()
                	)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}