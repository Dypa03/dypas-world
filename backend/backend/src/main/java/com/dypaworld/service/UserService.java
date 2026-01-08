package com.dypaworld.service;

import com.dypaworld.model.dto.UserRegistrationDTO;
import com.dypaworld.model.entity.User;


public interface UserService {
    User registerUser(UserRegistrationDTO userRegistrationDTO);
    
    boolean loginUser(UserRegistrationDTO userRegistrationDTO);

    User updateUserDetails(UserRegistrationDTO userRegistrationDTO);

    boolean deleteUser(Long userId);

    User getUserById(Long userId);
}
