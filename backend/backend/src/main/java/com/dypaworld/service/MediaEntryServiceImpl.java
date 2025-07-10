package com.dypaworld.service;

import java.util.List;

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

    @Override
    public MediaEntry addMediaEntry(MediaEntryDTO mediaEntryDTO, User user) {
        // TODO: refine
        if (mediaEntryDTO == null) {
            throw new IllegalArgumentException("Media entry data cannot be null");
        };

        MediaEntry mediaEntry = new MediaEntry();
        mediaEntry.setCategory(mediaEntryDTO.getCategory());
        mediaEntry.setTitle(mediaEntryDTO.getTitle());
        mediaEntry.setImageUrl(mediaEntryDTO.getImageUrl());


        /*if (user == null) {
            throw new IllegalArgumentException("User with ID " + user.getId() + " does not exist");
        }*/
        mediaEntry.setUser(user);

        return mediaEntryRepository.save(mediaEntry);
    };

    @Override
    public MediaEntry updateMediaEntry(MediaEntryDTO mediaEntryDTO) {
        // TODO: refine
        if (mediaEntryDTO == null || mediaEntryDTO.getId() == null) {
            throw new IllegalArgumentException("Media entry data cannot be null and must have an ID");
        }

        MediaEntry existingMediaEntry = mediaEntryRepository.findById(mediaEntryDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("Media entry with ID " + mediaEntryDTO.getId() + " does not exist"));


        existingMediaEntry.setCategory(mediaEntryDTO.getCategory());
        existingMediaEntry.setTitle(mediaEntryDTO.getTitle());
        existingMediaEntry.setRating(mediaEntryDTO.getRating());
        existingMediaEntry.setImageUrl(mediaEntryDTO.getImageUrl());


        return mediaEntryRepository.save(existingMediaEntry);
    };

    @Override
    public boolean deleteMediaEntry(Integer entryId) {
        // TODO: refine
        if (entryId <= 0) {;
            throw new IllegalArgumentException("Entry ID must be a positive integer");
        }

        // Check if the media entry exists
        if (!mediaEntryRepository.existsById(entryId)) {
            throw new IllegalArgumentException("Media entry with ID " + entryId + " does not exist");
        }

        mediaEntryRepository.deleteById(entryId);
        return true;
    };

    @Override
    public MediaEntry getMediaEntryById(Integer entryId) {
        // TODO: refine
        if (entryId == null || entryId <= 0) {
            throw new IllegalArgumentException("Entry ID must be a positive integer");
        }

        return mediaEntryRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("Media entry with ID " + entryId + " does not exist"));
    };

    @Override
    public List<MediaEntry> getAllMediaEntriesByUserAndCategory(User user, String category) {
        // TODO: refine
        return mediaEntryRepository.findMediaEntriesByUserAndCategory(user, category);
    };

    @Override
    public List<MediaEntry> getAllMediaEntriesByUserId(Integer userId) {
        // TODO: refine
        if (userId == null) {
            throw new IllegalArgumentException("User ID and category cannot be null");
        }



        return mediaEntryRepository.findMediaEntriesByUserId(userId);
    }

}
