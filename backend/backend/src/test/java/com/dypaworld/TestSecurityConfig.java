package com.dypaworld;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;

@TestConfiguration
public class TestSecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager() {
        return authentication -> authentication; // mock semplice
    }
}
