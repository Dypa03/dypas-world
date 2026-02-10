package com.dypaworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dypaworld.model.entity.UserMediaEntry;
import com.dypaworld.model.entity.UserMediaEntryKey;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserMediaEntryRepository extends JpaRepository<UserMediaEntry, UserMediaEntryKey> {
    public List<UserMediaEntry> findByUserId(Long userId);
    public Optional<UserMediaEntry> findByUserIdAndMediaEntryId(Long userId, Long mediaEntryId);
}
