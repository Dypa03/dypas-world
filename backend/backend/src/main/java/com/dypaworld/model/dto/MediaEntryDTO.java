package com.dypaworld.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MediaEntryDTO {
    private Long id;
    private String apiMediaRecordId;
    private String title;
    private String category;
    private int rating;
    private String imageUrl;
    private String createdAt;
    private String releaseDate;
    private String author;

    // Constructor for media entry creation
    public MediaEntryDTO(String title, String category, String imageUrl, String apiMediaRecordId, int rating, String releaseDate, String author) {
        this.apiMediaRecordId = apiMediaRecordId;
        this.title = title;
        this.category = category;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.author = author;
    }
}
