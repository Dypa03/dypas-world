package com.dypaworld.service;

import com.dypaworld.model.entity.MediaEntry;
import java.util.List;

public interface MediaEntryService {
    void addMediaEntry(String title, String description, String mediaType, String filePath, Integer userId);

    void updateMediaEntry(Integer entryId, String title, String description, String mediaType, String filePath);

    void deleteMediaEntry(Integer entryId);

    MediaEntry getMediaEntryById(Integer entryId);

    List<MediaEntry> getAllMediaEntriesByUserIdAndCategory(Integer userId, String category);
}
