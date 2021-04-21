package com.arejczak.uptive.repositories;

import com.arejczak.uptive.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
