package com.dypaworld.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class UserMediaEntryKey {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "media_entry_id", nullable = false)
    private Long mediaEntryId;
}
