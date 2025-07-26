package com.dypaworld.service;

import com.dypaworld.model.dto.MediaEntryDTO;
import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.model.entity.User;

import java.util.List;

public interface MediaEntryService {
    MediaEntry addMediaEntry(MediaEntryDTO mediaEntryDTO, User user);

    MediaEntry updateMediaEntry(MediaEntryDTO mediaEntryDTO);

    boolean deleteMediaEntry(Integer entryId);

    MediaEntry getMediaEntryById(Integer entryId);

    List<MediaEntry> getAllMediaEntriesByUserAndCategory(User user, String category);

    List<MediaEntry> getAllMediaEntriesByUser(User user);
}
