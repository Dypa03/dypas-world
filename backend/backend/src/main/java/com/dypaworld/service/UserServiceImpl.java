package com.dypaworld.service;

import com.dypaworld.model.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dypaworld.model.entity.User;
import com.dypaworld.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User registerUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String username = userDTO.getUsername();
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();

        if (username == null || email == null || password == null) {
            throw new IllegalArgumentException("Username, email, and password cannot be null");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setRole("USER");

        System.out.println(newUser);
        return userRepository.save(newUser);
    }

    @Override
    public boolean loginUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String email = userDTO.getEmail();
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();

        if (password == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }

        Optional<User> user;
        if (email == null) {
            user = userRepository.findByUsername(username);
        } else {
            user = userRepository.findByEmail(email);
        }

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found with the provided email or username");
        }
        return passwordEncoder.matches(password, user.get().getPassword());
    }


    @Override
    public User updateUserDetails(UserDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String name = userDTO.getUsername();
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();
        Optional<User> user = userRepository.findByUsername(name);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found with the provided username");
        }
        user.get().setPassword(userDTO.getPassword());

        return userRepository.save(user.get());
    }

    // deleteUser method to remove a user from the system
    @Override
    public boolean deleteUser(Long userId) {
        // TODO: Implement the logic to delete a user by ID
        return false;
    }

    @Override
    public User getUserById(Long userId) {
        if (userId == null || userId <= 0) {
            throw new IllegalArgumentException("User ID must be a positive integer");
        }

        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " does not exist"));
    }


}
