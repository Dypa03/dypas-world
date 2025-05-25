package com.dypaworld.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dypaworld.model.entity.MediaEntry;


public interface MediaEntryRepository extends JpaRepository<MediaEntry, Integer> {
    // TODO: check if there are any custom query methods needed
    // For now, JpaRepository provides basic CRUD operations
    public List<MediaEntry> findMediaEntriesByUserIdAndCategory(Integer userId, String category);
    
    //public List<MediaEntry> findMediaEntriesByUserId(Integer userId);
}
