package com.dypaworld.controller;

import com.dypaworld.model.dto.UserLoginDTO;
import com.dypaworld.model.dto.UserRegistrationDTO;
import com.dypaworld.model.entity.User;
import com.dypaworld.service.UserService;
import jakarta.websocket.OnClose;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    @PostMapping(path="/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        try {
            String hashPassword = passwordEncoder.encode(userRegistrationDTO.getPassword());
            userRegistrationDTO.setPassword(hashPassword);
            User savedUser = userService.registerUser(userRegistrationDTO);
            System.out.println(savedUser);

            if (savedUser.getId() > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("LETS-AH GO");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register user");
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user" + ex.getMessage());
        }

    }


    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody UserLoginDTO userLoginDTO) {
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(userLoginDTO.getUsername(), userLoginDTO.getPassword());
        Authentication authenticationResponse = authenticationManager.authenticate(authenticationRequest);
        System.out.println(authenticationResponse);
        SecurityContextHolder.getContext().setAuthentication(authenticationResponse);
        return ResponseEntity.ok().build();
    }

    /*@GetMapping(path = "/user-info")
    public ResponseEntity<Map<String, Object>> getUserInfo(
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        System.out.println(principal.getAttributes());
        return ResponseEntity.ok(principal.getAttributes());
    }*/
    @GetMapping(path = "/user-info")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        System.out.println(authentication.isAuthenticated());

        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2User oAuth2User) {
            return ResponseEntity.ok(oAuth2User.getAttributes());
        }

        if (principal instanceof UserDetails userDetails) {
            Map<String, Object> response = new HashMap<>();
            response.put("username", userDetails.getUsername());
            response.put("authorities", userDetails.getAuthorities());
            response.put("type", "FORM_LOGIN");
            return ResponseEntity.ok(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("principal", principal.toString());
        response.put("type", "UNKNOWN");
        return ResponseEntity.ok(response);
    }

}
