package com.dypaworld.controller;

import com.dypaworld.model.dto.MediaEntryDTO;

import java.util.List;


import com.dypaworld.model.dto.UserMediaEntryDTO;
import com.dypaworld.model.entity.User;
import com.dypaworld.model.entity.UserMediaEntry;
import com.dypaworld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.service.UserMediaEntryService;

@RestController
@RequestMapping("/api/media-entry")
public class MediaEntryController {

    @Autowired
    private UserMediaEntryService userMediaEntryService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/add")
    public MediaEntry addMediaEntry(@RequestBody MediaEntryDTO mediaEntryDTO,
                                     @AuthenticationPrincipal Object principal) {
        User user = getUserFromPrincipal(principal);
        return userMediaEntryService.addMediaEntry(mediaEntryDTO, user);
    }

    @GetMapping(path = "/get-all-by-category-user")
    public List<UserMediaEntryDTO> getMediaEntryByUserAndCategory(@RequestParam("category") String category,
                                                                  @AuthenticationPrincipal Object principal) {
        System.out.println(principal);
        User user = getUserFromPrincipal(principal);
        return userMediaEntryService.getAllMediaEntriesByUserAndCategory(user, category);

    }

    @PostMapping(path = "/update-rating")
    public UserMediaEntry updateMediaEntry(@RequestBody UserMediaEntryDTO userMediaEntryDTO,
                                           @AuthenticationPrincipal Object principal) {
        User user = getUserFromPrincipal(principal);
        return userMediaEntryService.updateUserMediaEntry(userMediaEntryDTO, user);
    }

    @PostMapping(path = "/delete/{mediaEntryId}")
    public boolean deleteMediaEntry(@PathVariable("mediaEntryId") Long mediaEntryId, @AuthenticationPrincipal Object principal) {
        User user = getUserFromPrincipal(principal);
        return userMediaEntryService.deleteUserMediaEntry(mediaEntryId, user);
    }

    private User getUserFromPrincipal(Object principal) {
        User user = new User();
        if (principal instanceof OAuth2User oAuth2User) {
            user = userRepository.findByEmail(oAuth2User.getAttribute("email")).orElse(null);
        } else if (principal instanceof UserDetails userDetails) {
            user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        }
        return user;
    }
}
