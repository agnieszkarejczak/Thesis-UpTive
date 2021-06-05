package com.arejczak.uptive.controllers;

import com.arejczak.uptive.repositories.LevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/levels")
public class LevelController {

    @Autowired
    private final LevelRepository levelRepository;


    public LevelController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping({"","/"})
    public ResponseEntity getActivities(){
        return new ResponseEntity<>(levelRepository.findAll(), HttpStatus.OK);
    }

}
