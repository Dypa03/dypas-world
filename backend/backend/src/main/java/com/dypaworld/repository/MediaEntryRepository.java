package com.dypaworld.repository;

import java.util.List;

import com.dypaworld.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dypaworld.model.entity.MediaEntry;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaEntryRepository extends JpaRepository<MediaEntry, Integer> {
    // TODO: check if there are any custom query methods needed
    // For now, JpaRepository provides basic CRUD operations
        List<MediaEntry> findMediaEntriesByUserAndCategory(User user, String category);

    List<MediaEntry> findMediaEntriesByUserId(Integer userId);

}
