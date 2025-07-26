package com.dypaworld.controller;

import com.dypaworld.model.dto.MediaEntryDTO;

import java.util.List;
import java.util.Optional;


import com.dypaworld.model.entity.User;
import com.dypaworld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.service.MediaEntryService;

@RestController
@RequestMapping("/api/media-entry")
public class MediaEntryController {

    @Autowired
    private MediaEntryService mediaEntryService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/add")
    public MediaEntry addMediaEntry(@RequestBody MediaEntryDTO mediaEntryDTO,
                                     @AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Optional<User> user = userRepository.findByEmail(email);
        return mediaEntryService.addMediaEntry(mediaEntryDTO, user.orElse(null));
    }

    @GetMapping(path = "/get-all-by-category-user")
    public List<MediaEntry> getMediaEntryByUserAndCategory(@RequestParam("category") String category,
                                                             @AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Optional<User> user = userRepository.findByEmail(email);
        return mediaEntryService.getAllMediaEntriesByUserAndCategory(user.orElse(null), category);
    }

    @GetMapping(path = "/get-all-by-user-id")
    public List<MediaEntry> getMediaEntryByUserId(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Optional<User> user = userRepository.findByEmail(email);
        return mediaEntryService.getAllMediaEntriesByUser(user.orElse(null));
    }

    @PostMapping(path = "/delete")
    public boolean deleteMediaEntry(@RequestParam ("id") Integer id) {
        return mediaEntryService.deleteMediaEntry(id);
    }

}
