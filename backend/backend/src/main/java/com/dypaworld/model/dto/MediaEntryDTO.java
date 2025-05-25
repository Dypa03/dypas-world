package com.dypaworld.model.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MediaEntryDTO {
    private Integer id;
    private UserDTO user;
    private String title;
    private String category;
    private int rating;
    private String text;
    private String createdAt;

    // Constructor for media entry creation
    public MediaEntryDTO(UserDTO user, String title, String category, int rating, String text) {
        this.user = user;
        this.title = title;
        this.category = category;
        this.rating = rating;
        this.text = text;
    }

    // Constructor for media entry creation
    public MediaEntryDTO(UserDTO user, String title, String category) {
        this.user = user;
        this.title = title;
        this.category = category;
    }
}
