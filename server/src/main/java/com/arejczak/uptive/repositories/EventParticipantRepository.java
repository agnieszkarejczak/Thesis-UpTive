package com.arejczak.uptive.repositories;

import com.arejczak.uptive.models.Activity;
import com.arejczak.uptive.models.EventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, Long> {
}
