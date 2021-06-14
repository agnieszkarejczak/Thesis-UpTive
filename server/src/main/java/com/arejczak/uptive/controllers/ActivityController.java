package com.arejczak.uptive.controllers;

import com.arejczak.uptive.dto.AddAcitivityDTO;
import com.arejczak.uptive.repositories.ActivityRepository;
import com.arejczak.uptive.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private final ActivityRepository activityRepository;

    @Autowired
    private final ActivityService activityService;

    public ActivityController(ActivityRepository activityRepository, ActivityService activityService) {
        this.activityRepository = activityRepository;
        this.activityService = activityService;
    }

    @GetMapping({"","/"})
    public ResponseEntity getActivities(){
        return new ResponseEntity<>(activityRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping({"/add"})
    public ResponseEntity addActivity(@RequestBody AddAcitivityDTO activity){
        return activityService.addActivity(activity.getName());
    }

}
