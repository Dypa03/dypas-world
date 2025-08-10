package com.dypaworld.service;

import com.dypaworld.model.dto.UserDTO;
import com.dypaworld.model.entity.User;


public interface UserService {
    User registerUser(UserDTO userDTO);
    
    boolean loginUser(UserDTO userDTO);

    User updateUserDetails(UserDTO userDTO);

    boolean deleteUser(Long userId);

    User getUserById(Long userId);
}
