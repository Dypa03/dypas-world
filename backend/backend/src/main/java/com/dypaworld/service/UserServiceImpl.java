package com.dypaworld.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dypaworld.model.entity.User;
import com.dypaworld.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void registerUser(String username, String email, String password) {
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
        userRepository.save(newUser);
    };

    @Override
    public boolean loginUser(String email, String password) {
        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and password cannot be null");
        }

        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
         
    }

    @Override
    public void updateUserDetails(Integer userId, String newDetails) {
        // TODO: Implement the logic to update user details
        return;
    }

    @Override
    public void deleteUser(Integer userId) {
        // TODO: Implement the logic to delete a user
        return;
    }


}
