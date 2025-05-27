package com.dypaworld.controller;

import com.dypaworld.model.dto.MediaEntryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.dypaworld.model.entity.MediaEntry;
import com.dypaworld.service.MediaEntryService;

@RestController
@RequestMapping("/api/media-entry")
public class MediaEntryController {
    @Autowired
    private MediaEntryService mediaEntryService;

    @PostMapping(path = "/add")
    public MediaEntry addMediaEntry(@RequestBody MediaEntryDTO mediaEntryDTO) {
        return mediaEntryService.addMediaEntry(mediaEntryDTO);
    }

    @PostMapping(path = "/delete")
    public boolean deleteMediaEntry(@RequestParam ("id") Integer id) {
        return mediaEntryService.deleteMediaEntry(id);
    }

}
