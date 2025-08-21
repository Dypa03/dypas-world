package com.dypaworld.controller;

import com.dypaworld.model.dto.MediaEntryDTO;

import java.util.List;
import java.util.Optional;


import com.dypaworld.model.dto.UserMediaEntryDTO;
import com.dypaworld.model.entity.User;
import com.dypaworld.model.entity.UserMediaEntry;
import com.dypaworld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
                                     @AuthenticationPrincipal OAuth2User principal) {
        return userMediaEntryService.addMediaEntry(mediaEntryDTO, getUserFromPrincipal(principal).orElse(null));
    }

    @GetMapping(path = "/get-all-by-category-user")
    public List<UserMediaEntryDTO> getMediaEntryByUserAndCategory(@RequestParam("category") String category,
                                                                  @AuthenticationPrincipal OAuth2User principal) {

        return userMediaEntryService.getAllMediaEntriesByUserAndCategory(getUserFromPrincipal(principal).orElse(null), category);
    }

    @PostMapping(path = "/update-rating")
    public UserMediaEntry updateMediaEntry(@RequestBody UserMediaEntryDTO userMediaEntryDTO,
                                           @AuthenticationPrincipal OAuth2User principal) {
        return userMediaEntryService.updateUserMediaEntry(userMediaEntryDTO, getUserFromPrincipal(principal).orElse(null));
    }

    @GetMapping(path = "/get-all-by-user")
    public List<MediaEntry> getMediaEntryByUserId(@AuthenticationPrincipal OAuth2User principal) {
        return null;
    }



    @PostMapping(path = "/delete/{id}")
    public boolean deleteMediaEntry(@PathVariable("id") Long id, @AuthenticationPrincipal OAuth2User principal) {
        System.out.println("MIAOOOOOOOOOOOOOOOOOOOOOOOO");
        return userMediaEntryService.deleteUserMediaEntry(id, getUserFromPrincipal(principal).orElse(null));
    }

    private Optional<User> getUserFromPrincipal(OAuth2User principal) {
        String email = principal.getAttribute("email");
        return userRepository.findByEmail(email);
    }
}
