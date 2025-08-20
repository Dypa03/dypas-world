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


}
