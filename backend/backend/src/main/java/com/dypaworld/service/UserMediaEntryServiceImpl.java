package com.dypaworld.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.dypaworld.model.dto.UserMediaEntryDTO;
import com.dypaworld.model.entity.UserMediaEntry;
import com.dypaworld.model.entity.UserMediaEntryKey;
import com.dypaworld.repository.UserMediaEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.model.dto.MediaEntryDTO;
import com.dypaworld.repository.MediaEntryRepository;
import org.springframework.stereotype.Service;
import com.dypaworld.model.entity.User;

@Service
public class UserMediaEntryServiceImpl implements UserMediaEntryService {

    @Autowired
    private MediaEntryRepository mediaEntryRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserMediaEntryRepository userMediaEntryRepository;

    @Override
    public MediaEntry addMediaEntry(MediaEntryDTO mediaEntryDTO, User user) {
        if (mediaEntryDTO == null || mediaEntryDTO.getCategory() == null || mediaEntryDTO.getTitle() == null) {
            throw new IllegalArgumentException("Media entry data cannot be null");
        };

        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("User is not authenticated or does not exist");
        }

        System.out.println("Adding media entry for user: " + user.getId());
        System.out.println(mediaEntryDTO);

        MediaEntry mediaEntry = new MediaEntry();

        Optional<MediaEntry> existingMediaEntry = mediaEntryRepository.findByApiMediaRecordIdAndCategory(mediaEntryDTO.getApiMediaRecordId(), mediaEntryDTO.getCategory());
        if (existingMediaEntry.isEmpty()) {
            mediaEntry.setApiMediaRecordId(mediaEntryDTO.getApiMediaRecordId());
            mediaEntry.setCategory(mediaEntryDTO.getCategory());
            mediaEntry.setTitle(mediaEntryDTO.getTitle());
            mediaEntry.setImageUrl(mediaEntryDTO.getImageUrl());
            mediaEntry.setReleaseDate(mediaEntryDTO.getReleaseDate());
            mediaEntry.setAuthor(mediaEntryDTO.getAuthor());
            
            mediaEntry = mediaEntryRepository.save(mediaEntry);
        } else {
            mediaEntry = existingMediaEntry.get();
        }

        UserMediaEntryKey userMediaEntryKey = new UserMediaEntryKey(user.getId(), mediaEntry.getId());

        UserMediaEntry userMediaEntry = new UserMediaEntry();
        userMediaEntry.setId(userMediaEntryKey);
        userMediaEntry.setUser(user);
        userMediaEntry.setMediaEntry(mediaEntry);
        userMediaEntry.setRating(mediaEntryDTO.getRating());

        userMediaEntryRepository.save(userMediaEntry);

        return mediaEntry;
    };

    @Override
    public UserMediaEntry updateUserMediaEntry(UserMediaEntryDTO userMediaEntryDTO, User user) {
        if (userMediaEntryDTO == null || userMediaEntryDTO.getMediaEntryId() == null) {
            throw new IllegalArgumentException("Media entry data cannot be null and must have an ID");
        }

        UserMediaEntryKey userMediaEntryKey = new UserMediaEntryKey(user.getId(), userMediaEntryDTO.getMediaEntryId());

        UserMediaEntry existingUserMediaEntry = userMediaEntryRepository.findById(userMediaEntryKey)
                .orElseThrow(() -> new IllegalArgumentException("Media entry with ID " + userMediaEntryDTO.getMediaEntryId() + " does not exist"));

        existingUserMediaEntry.setRating(userMediaEntryDTO.getRating());

        return userMediaEntryRepository.save(existingUserMediaEntry);
    };

    @Override
    public boolean deleteUserMediaEntry(Long entryId, User user) {
        if (entryId <= 0) {;
            throw new IllegalArgumentException("Entry ID must be a positive integer");
        }

        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("User is not authenticated or does not exist");
        }

        System.out.println("Deleting media entry for user: " + user.getId());
        UserMediaEntryKey userMediaEntryKey = new UserMediaEntryKey(user.getId(), entryId);
        System.out.println(userMediaEntryKey);

        UserMediaEntry existingUserMediaEntry = userMediaEntryRepository.findByUserIdAndMediaEntryId(user.getId(), entryId)
                .orElseThrow(() -> new IllegalArgumentException("Media entry with ID " + entryId + " does not exist"));

        try {
            userMediaEntryRepository.delete(existingUserMediaEntry);
        } catch (Exception e) {
            return false;
        }
        return true;
    };

    @Override
    public MediaEntry getMediaEntryById(Long entryId) {
        if (entryId == null || entryId <= 0) {
            throw new IllegalArgumentException("Entry ID must be a positive integer");
        }

        return mediaEntryRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("Media entry with ID " + entryId + " does not exist"));
    };

    @Override
    public List<UserMediaEntryDTO> getAllMediaEntriesByUserAndCategory(User user, String category) {
        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("User is not authenticated or does not exist");
        }
        if (category == null) {
            throw new IllegalArgumentException("Category cannot be null");
        }

        List<UserMediaEntry> allUserMediaEntries = userMediaEntryRepository.findByUserId(user.getId());

        List<UserMediaEntryDTO> userMediaEntriesByCategory = new ArrayList<>();

        for (UserMediaEntry userMediaEntry : allUserMediaEntries) {
            if (userMediaEntry.getMediaEntry().getCategory().equals(category)) {

                UserMediaEntryDTO userMediaEntryDTO = new UserMediaEntryDTO();
                userMediaEntryDTO.setMediaEntryId(userMediaEntry.getId().getMediaEntryId());
                userMediaEntryDTO.setTitle(userMediaEntry.getMediaEntry().getTitle());
                userMediaEntryDTO.setImageUrl(userMediaEntry.getMediaEntry().getImageUrl());
                userMediaEntryDTO.setRating(userMediaEntry.getRating());
                userMediaEntryDTO.setReleaseDate(userMediaEntry.getMediaEntry().getReleaseDate());
                userMediaEntryDTO.setAuthor(userMediaEntry.getMediaEntry().getAuthor());

                userMediaEntriesByCategory.add(userMediaEntryDTO);
            }
        }

        return userMediaEntriesByCategory;
    }
}
