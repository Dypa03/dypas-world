package com.dypaworld.model.entity;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "media_entries")
public class MediaEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "media_entry_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "api_media_record_id")
    private String apiMediaRecordId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private String releaseDate;

    private String author;



    @OneToMany(mappedBy = "mediaEntry")
    @JsonIgnore
    private Set<UserMediaEntry> userMediaEntries;

    // Additional constructor for media entry creation
    public MediaEntry(String title, String category, String imageUrl) {
        this.title = title;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}
