package com.arejczak.uptive.services;

import com.arejczak.uptive.dto.UserActivityDTO;
import com.arejczak.uptive.models.Activity;
import com.arejczak.uptive.models.UserDetails;
import com.arejczak.uptive.repositories.ActivityRepository;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class ActivityService{

    @Autowired
    private ActivityRepository activityRepository;

    public ResponseEntity addActivity(String name){
        if(activityRepository.findByName(name).isPresent()){
            return new ResponseEntity<>("Already exist", HttpStatus.CONFLICT);
        }
        Activity activity = new Activity(name);
        activityRepository.save(activity);
        return new ResponseEntity<>(activity, HttpStatus.OK);
    }
}
