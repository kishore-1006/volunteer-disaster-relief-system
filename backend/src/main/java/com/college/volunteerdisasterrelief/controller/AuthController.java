package com.college.volunteerdisasterrelief.controller;

import com.college.volunteerdisasterrelief.dto.ForgotPasswordRequest;
import com.college.volunteerdisasterrelief.dto.JwtAuthResponse;
import com.college.volunteerdisasterrelief.dto.LoginRequest;
import com.college.volunteerdisasterrelief.dto.RegisterRequest;
import com.college.volunteerdisasterrelief.dto.ResetPasswordRequest;
import com.college.volunteerdisasterrelief.dto.UserDto;
import com.college.volunteerdisasterrelief.model.entity.User;
import com.college.volunteerdisasterrelief.model.entity.Volunteer;
import com.college.volunteerdisasterrelief.repository.UserRepository;
import com.college.volunteerdisasterrelief.repository.VolunteerRepository;
import com.college.volunteerdisasterrelief.util.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final VolunteerRepository volunteerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserDto userDto = UserDto.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .phoneNumber(user.getPhoneNumber())
                    .build();

            return ResponseEntity.ok(JwtAuthResponse.builder()
                    .accessToken(token)
                    .tokenType("Bearer")
                    .user(userDto)
                    .build());

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Login error: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email address is already registered!"));
        }

        String role = registerRequest.getRole() != null ? registerRequest.getRole() : "VOLUNTEER";

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phoneNumber(registerRequest.getPhoneNumber())
                .role(role)
                .build();

        User savedUser = userRepository.save(user);

        // Also save Volunteer record if applicable
        if (volunteerRepository.findByEmail(registerRequest.getEmail()).isEmpty()) {
            Volunteer volunteer = Volunteer.builder()
                    .name(registerRequest.getName())
                    .email(registerRequest.getEmail())
                    .phoneNumber(registerRequest.getPhoneNumber())
                    .skills(registerRequest.getSkills() != null ? registerRequest.getSkills() : "Disaster Relief")
                    .availabilityStatus("AVAILABLE")
                    .location(registerRequest.getLocation() != null ? registerRequest.getLocation() : "City")
                    .experienceYears(1)
                    .build();
            volunteerRepository.save(volunteer);
        }

        String token = jwtTokenProvider.generateTokenFromEmail(savedUser.getEmail());

        UserDto userDto = UserDto.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .phoneNumber(savedUser.getPhoneNumber())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(JwtAuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(userDto)
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User not authenticated"));
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .phoneNumber(user.getPhoneNumber())
                .build();

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No account found registered with this email address."));
        }

        User user = userOptional.get();
        String resetToken = java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "Reset token generated successfully.",
                "resetToken", resetToken
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User account not found."));
        }

        User user = userOptional.get();
        if (user.getResetToken() == null || !user.getResetToken().equals(request.getToken())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid reset token."));
        }

        if (user.getResetTokenExpiry() == null || java.time.LocalDateTime.now().isAfter(user.getResetTokenExpiry())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Reset token has expired. Please request a new one."));
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Password reset successfully! You can now log in."));
    }
}
