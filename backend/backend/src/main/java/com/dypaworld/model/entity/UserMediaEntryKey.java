package com.dypaworld.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserMediaEntryKey {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "media_entry_id", nullable = false)
    private Long mediaEntryId;
}
