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
        return eventService.addEvent(eventDTO);
    }

    @PostMapping("/participant/add")
    public ResponseEntity addParticipant(@RequestBody ParticipantAddDTO participantAddDTO){
        return eventService.addParticipant(participantAddDTO);
    }
    @PutMapping("/participant/{id}/accept")
    public ResponseEntity acceptParticipant(@PathVariable("id") Long id){
        return eventService.acceptParticipant(id);
    }

    @DeleteMapping("/participant/{id}/reject")
    public ResponseEntity rejectParticipant(@PathVariable("id") Long id){
        return eventService.rejectParticipant(id);
    }

}
