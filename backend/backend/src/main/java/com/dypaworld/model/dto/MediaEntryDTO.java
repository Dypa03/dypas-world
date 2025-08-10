package com.dypaworld.model.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import com.dypaworld.model.entity.User;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MediaEntryDTO {
    private Long id;
    private Long apiMediaRecordId;
    private String title;
    private String category;
    private int rating;
    private String imageUrl;
    private String createdAt;

    // Constructor for media entry creation
    public MediaEntryDTO(String title, String category, String imageUrl) {
        this.title = title;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}
