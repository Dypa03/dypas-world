package com.dypaworld.service;

import com.dypaworld.model.dto.UserRegistrationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dypaworld.model.entity.User;
import com.dypaworld.repository.UserRepository;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User registerUser(UserRegistrationDTO userRegistrationDTO) {
        if (userRegistrationDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String username = userRegistrationDTO.getUsername();
        String email = userRegistrationDTO.getEmail();
        String password = userRegistrationDTO.getPassword();

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
    public boolean loginUser(UserRegistrationDTO userRegistrationDTO) {
        if (userRegistrationDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String email = userRegistrationDTO.getEmail();
        String username = userRegistrationDTO.getUsername();
        String password = userRegistrationDTO.getPassword();

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



        return true;
    }


    @Override
    public User updateUserDetails(UserRegistrationDTO userRegistrationDTO) {
        if (userRegistrationDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String name = userRegistrationDTO.getUsername();
        String email = userRegistrationDTO.getEmail();
        String password = userRegistrationDTO.getPassword();
        Optional<User> user = userRepository.findByUsername(name);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found with the provided username");
        }
        user.get().setPassword(userRegistrationDTO.getPassword());

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
