package com.arejczak.uptive.controllers;

import com.arejczak.uptive.dto.EventAddDTO;
import com.arejczak.uptive.dto.ParticipantAddDTO;
import com.arejczak.uptive.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping({"","/"})
    public ResponseEntity getEvents(){
        return new ResponseEntity<>(eventService.getEvents(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addEvent(@RequestBody EventAddDTO eventDTO){
        return new ResponseEntity<>(eventService.addEvent(eventDTO),HttpStatus.OK);
    }

    @PostMapping("/participant/add")
    public ResponseEntity addParticipant(@RequestBody ParticipantAddDTO participantAddDTO){
        return new ResponseEntity<>(eventService.addParticipant(participantAddDTO),HttpStatus.OK);
    }

}
