package com.dypaworld.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "user_media_entries")
public class UserMediaEntry {
    @EmbeddedId
    private UserMediaEntryKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("mediaEntryId")
    @JoinColumn(name = "media_entry_id")
    private MediaEntry mediaEntry;

    int rating;

}
