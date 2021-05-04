package com.arejczak.uptive.repositories;

import com.arejczak.uptive.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
