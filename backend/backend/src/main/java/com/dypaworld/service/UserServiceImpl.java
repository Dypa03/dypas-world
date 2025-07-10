package com.dypaworld.service;

import com.dypaworld.model.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dypaworld.model.entity.User;
import com.dypaworld.repository.UserRepository;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // registerUser method to create a new user
    @Override
    public User registerUser(UserDTO userDTO) {
        // Error handling
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO cannot be null");
        }
        String name = userDTO.getName();
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();

        if (name == null || email == null || password == null) {
            throw new IllegalArgumentException("Username, email, and password cannot be null");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (userRepository.existsByName(name)) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Create a new User entity and save it to the repository
        User newUser = new User(name, email, password);
        return userRepository.save(newUser);
    }

    // loginUser method to authenticate a user
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

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found with the provided email");
        } else {
            if (user.get().getPassword().equals(password)) {
                return true;
            } else {
                throw new IllegalArgumentException("Incorrect password");
            }
        }
    }

    // updateUserDetails method to update user information, like username or email, or password
    @Override
    public User updateUserDetails(UserDTO userDTO) {
        // TODO: Implement the logic to update user details
        return null;
    }

    // deleteUser method to remove a user from the system
    @Override
    public boolean deleteUser(Integer userId) {
        // TODO: Implement the logic to delete a user by ID
        return false;
    }

    @Override
    public User getUserById(Integer userId) {
        if (userId == null || userId <= 0) {
            throw new IllegalArgumentException("User ID must be a positive integer");
        }

        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " does not exist"));
    }


}
