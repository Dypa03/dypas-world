package com.dypaworld.model.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private String password;

    // Constructor for user registration
    public UserDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Constructor for user login
    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
