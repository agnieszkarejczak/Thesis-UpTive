package com.arejczak.uptive.repositories;

import com.arejczak.uptive.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> getUserByEmail(String email);
}
