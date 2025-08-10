package com.dypaworld.service;

import java.util.List;

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
public class MediaEntryServiceImpl implements MediaEntryService {

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

        MediaEntry mediaEntry = new MediaEntry();
        mediaEntry.setApiMediaRecordId(mediaEntryDTO.getApiMediaRecordId());
        mediaEntry.setCategory(mediaEntryDTO.getCategory());
        mediaEntry.setTitle(mediaEntryDTO.getTitle());
        mediaEntry.setImageUrl(mediaEntryDTO.getImageUrl());

        mediaEntry = mediaEntryRepository.save(mediaEntry);

        UserMediaEntry userMediaEntry  = new UserMediaEntry();
        userMediaEntry.setUser(user);
        userMediaEntry.setMediaEntry(mediaEntry);
        userMediaEntry.setRating(mediaEntryDTO.getRating());

        userMediaEntryRepository.save(userMediaEntry);

        return mediaEntry;
    };

    @Override
    public MediaEntry updateMediaEntry(MediaEntryDTO mediaEntryDTO) {
        if (mediaEntryDTO == null || mediaEntryDTO.getId() == null) {
            throw new IllegalArgumentException("Media entry data cannot be null and must have an ID");
        }

        MediaEntry existingMediaEntry = mediaEntryRepository.findById(mediaEntryDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("Media entry with ID " + mediaEntryDTO.getId() + " does not exist"));

        existingMediaEntry.setCategory(mediaEntryDTO.getCategory());
        existingMediaEntry.setTitle(mediaEntryDTO.getTitle());
        existingMediaEntry.setImageUrl(mediaEntryDTO.getImageUrl());

        return mediaEntryRepository.save(existingMediaEntry);
    };

    @Override
    public boolean deleteMediaEntry(Long entryId) {
        if (entryId <= 0) {;
            throw new IllegalArgumentException("Entry ID must be a positive integer");
        }

        if (!mediaEntryRepository.existsById(entryId)) {
            throw new IllegalArgumentException("Media entry with ID " + entryId + " does not exist");
        }

        mediaEntryRepository.deleteById(entryId);
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

    /*@Override
    public List<MediaEntry> getAllMediaEntriesByUserAndCategory(User user, String category) {
        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("User is not authenticated or does not exist");
        }
        if (category == null || category.isEmpty()) {
            throw new IllegalArgumentException("Category cannot be null or empty");
        }

        return mediaEntryRepository.findMediaEntriesByUserAndCategory(user, category);
    };

    @Override
    public List<MediaEntry> getAllMediaEntriesByUser(User user) {
        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("User is not authenticated or does not exist");
        }

        return mediaEntryRepository.findMediaEntriesByUserId(user.getId());
    }*/

}
