package com.arejczak.uptive.repositories;

import com.arejczak.uptive.models.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails,Long> {

}
