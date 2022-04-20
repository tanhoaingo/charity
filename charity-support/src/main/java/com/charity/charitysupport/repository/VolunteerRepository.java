package com.charity.charitysupport.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.charity.charitysupport.entity.Volunteer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

    @Query(value = "SELECT * FROM VOLUNTEER WHERE USER_ID = ?1 AND POST_ID = ?2", nativeQuery = true)
    Optional<Volunteer> findByUserAndPost(Long userId, Long postId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM VOLUNTEER WHERE USER_ID = ?1 AND POST_ID = ?2", nativeQuery = true)
    void deleteByUserAndPost(Long userId, Long postId);

    @Query(value = "SELECT * FROM VOLUNTEER WHERE STATUS = ?1 AND POST_ID = ?2", nativeQuery = true)
    List<Volunteer> findByStatusAndPost(String status, Long postId);

    @Query("SELECT count(v.user) FROM Volunteer as v group by v.user")
    Long getNumberOfVolunteer();
}
