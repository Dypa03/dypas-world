package com.dypaworld.model.dto;

import lombok.*;
import com.dypaworld.model.entity.User;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MediaEntryDTO {
    private Long id;
    private Long apiMediaRecordId;
    private String title;
    private String category;
    private int rating;
    private String imageUrl;
    private String createdAt;

    // Constructor for media entry creation
    public MediaEntryDTO(String title, String category, String imageUrl, Long apiMediaRecordId) {
        this.apiMediaRecordId = apiMediaRecordId;
        this.title = title;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}
