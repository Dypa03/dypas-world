package com.dypaworld.service;

import com.dypaworld.model.dto.MediaEntryDTO;
import com.dypaworld.model.dto.UserMediaEntryDTO;
import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.model.entity.User;
import com.dypaworld.model.entity.UserMediaEntry;

import java.util.List;

public interface MediaEntryService {
    MediaEntry addMediaEntry(MediaEntryDTO mediaEntryDTO, User user);

    UserMediaEntry updateMediaEntry(UserMediaEntryDTO userMediaEntryDTO, User user);

    boolean deleteMediaEntry(Long entryId);

    MediaEntry getMediaEntryById(Long entryId);

    List<UserMediaEntryDTO> getAllMediaEntriesByUserAndCategory(User user, String category);


}
