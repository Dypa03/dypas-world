package com.dypaworld.controller;

import com.dypaworld.model.dto.UserDTO;
import com.dypaworld.model.entity.User;
import com.dypaworld.service.UserService;
import com.dypaworld.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/greet")
    public String greet() {
        return "Wassup Nigga";
    }

    @PostMapping(path="/add")
    public User addUser(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
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
}
