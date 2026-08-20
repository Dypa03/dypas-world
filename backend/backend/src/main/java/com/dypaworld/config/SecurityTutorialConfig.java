// backend/src/main/java/com/dypaworld/SecurityConfig.java
package com.dypaworld.config;

import com.dypaworld.exceptionhandling.CustomAccessDeniedHandler;
import com.dypaworld.exceptionhandling.CustomBasicAuthenticationEntryPoint;
import com.dypaworld.service.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("tutorial")
public class SecurityTutorialConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, CustomOAuth2UserService customOAuth2UserService) throws Exception {
        http
            .sessionManagement(smc -> smc.invalidSessionUrl("/invalidSession"))
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests((authorizeRequests) ->
                    authorizeRequests
                            .requestMatchers("/login", "/api/user/**", "/error", "/s3/upload", "oauth2/**", "login/oauth2/**").permitAll()
                            .anyRequest().authenticated())
            .cors(Customizer.withDefaults());
        http.httpBasic(hbc -> hbc.authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint()));
        http.exceptionHandling(ehc -> ehc.accessDeniedHandler(new CustomAccessDeniedHandler()).accessDeniedPage("/denied"));
                /*.sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .maximumSessions(1)
                        .maxSessionsPreventsLogin(false)
                )
                .rememberMe(remember -> remember
                        .tokenRepository(persistentTokenRepository())
                        .tokenValiditySeconds(86400)
                        .userDetailsService(customOAuth2UserService)
                )*/
                //.formLogin(flc -> flc.disable())
                //.httpBasic(hbc -> hbc.disable())

        return http.build();
    }




    /*@Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user").password("$2a$12$vJcp3hWSZ8Wev1KUrKnsDepjqi8dpNc1QwjHzjpZL/B9cFWZ4oo/u").authorities("read").build();
        UserDetails admin = User.withUsername("admin").password("$2a$12$qzv/7/LEPqbA4ryXSh6f2eInJ0Uoo40EO0DqcJ9uV5afHymg2d3UC").authorities("admin").build();
        return new InMemoryUserDetailsManager(user, admin);
    }*/

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /*
    @Bean
    public CompromisedPasswordChecker compromisedPasswordChecker() {
        return new HaveIBeenPwnedPasswordChecker();
    }
    */
}