package com.dypaworld.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserMediaEntryDTO {
    Long mediaEntryId;
    String title;
    String imageUrl;
    int rating;
    String releaseDate;
    String author;

    // Constructor for updating rating
    public UserMediaEntryDTO(Long mediaEntryId, int rating) {
        this.mediaEntryId = mediaEntryId;
        this.rating = rating;
    }


}
