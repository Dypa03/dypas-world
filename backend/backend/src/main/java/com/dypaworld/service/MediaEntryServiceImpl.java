package com.dypaworld.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.repository.MediaEntryRepository;

public class MediaEntryServiceImpl implements MediaEntryService {

    @Autowired
    private MediaEntryRepository mediaEntryRepository;

    @Override
    public void addMediaEntry(String title, String description, String mediaType, String filePath, Integer userId) {
        return;
    };

    @Override
    public void updateMediaEntry(Integer entryId, String title, String description, String mediaType, String filePath) {
        return;
    };

    @Override
    public void deleteMediaEntry(Integer entryId) {
        return;
    };

    @Override
    public MediaEntry getMediaEntryById(Integer entryId) {
        return null;
    };

    @Override
    public List<MediaEntry> getAllMediaEntriesByUserIdAndCategory(Integer userId, String category) {
        if (userId == null || category == null) {
            throw new IllegalArgumentException("User ID and category cannot be null");
        }

        // Check if the user exists
        if (!mediaEntryRepository.existsById(userId)) {
            throw new IllegalArgumentException("User with ID " + userId + " does not exist");
        }

        return mediaEntryRepository.findMediaEntriesByUserIdAndCategory(userId, category);
    };


}
