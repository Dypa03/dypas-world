package com.dypaworld.service;

import com.dypaworld.model.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dypaworld.model.entity.User;
import com.dypaworld.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

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

        // Create a new User entity
        User newUser = new User(username, email, password);
        return userRepository.save(newUser);
    }

    @Override
    public boolean loginUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();

        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and password cannot be null");
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found with the provided email");
        } else {
            if (user.getPassword().equals(password)) {
                return true;
            } else {
                throw new IllegalArgumentException("Incorrect password");
            }
        }
    }

    @Override
    public User updateUserDetails(UserDTO userDTO) {
        return null;
    }

    @Override
    public boolean deleteUser(Integer userId) {
        return false;
    }


}
