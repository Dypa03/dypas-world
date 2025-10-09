package com.dypaworld.controller;

import com.dypaworld.model.dto.UserDTO;
import com.dypaworld.model.entity.User;
import com.dypaworld.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(path="/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        try {
            String hashPassword = passwordEncoder.encode(userDTO.getPassword());
            userDTO.setPassword(hashPassword);
            User savedUser = userService.registerUser(userDTO);
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

    @PostMapping(path="/login")
    public boolean loginUser(@RequestBody UserDTO userDTO) {
        return userService.loginUser(userDTO);
    }

    @GetMapping(path = "/user-info")
    public ResponseEntity<Map<String, Object>> getUserInfo(
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        System.out.println(principal.getAttributes());
        return ResponseEntity.ok(principal.getAttributes());
    }

    @GetMapping(path = "/miao")
    public ResponseEntity<String> miao() {
        return ResponseEntity.ok("Miao");
    }
}
