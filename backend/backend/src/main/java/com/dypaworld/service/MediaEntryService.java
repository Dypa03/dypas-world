package com.dypaworld.service;

import com.dypaworld.model.dto.MediaEntryDTO;
import com.dypaworld.model.entity.MediaEntry;
import java.util.List;

public interface MediaEntryService {
    MediaEntry addMediaEntry(MediaEntryDTO mediaEntryDTO, Integer userId);

    MediaEntry updateMediaEntry(MediaEntryDTO mediaEntryDTO);

    boolean deleteMediaEntry(Integer entryId);

    MediaEntry getMediaEntryById(Integer entryId);

    List<MediaEntry> getAllMediaEntriesByUserIdAndCategory(Integer userId, String category);

    List<MediaEntry> getAllMediaEntriesByUserId(Integer userId);
}
