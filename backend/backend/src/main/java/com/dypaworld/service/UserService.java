package com.dypaworld.service;

public interface UserService {
    void registerUser(String username, String email, String password);
    
    boolean loginUser(String email, String password);

    void updateUserDetails(Integer userId, String username);

    void deleteUser(Integer userId);
}
