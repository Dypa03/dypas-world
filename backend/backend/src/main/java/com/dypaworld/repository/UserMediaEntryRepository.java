package com.dypaworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dypaworld.model.entity.UserMediaEntry;
import com.dypaworld.model.entity.UserMediaEntryKey;

@Repository
public interface UserMediaEntryRepository extends JpaRepository<UserMediaEntry, UserMediaEntryKey> {
}
