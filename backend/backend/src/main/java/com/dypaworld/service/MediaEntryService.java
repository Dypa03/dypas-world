package com.dypaworld.service;

import com.dypaworld.model.dto.MediaEntryDTO;
import com.dypaworld.model.dto.UserMediaEntryDTO;
import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.model.entity.User;

import java.util.List;

public interface MediaEntryService {
    MediaEntry addMediaEntry(MediaEntryDTO mediaEntryDTO, User user);

    MediaEntry updateMediaEntry(MediaEntryDTO mediaEntryDTO);

    boolean deleteMediaEntry(Long entryId);

    MediaEntry getMediaEntryById(Long entryId);

    List<UserMediaEntryDTO> getAllMediaEntriesByUserAndCategory(User user, String category);


}
