package com.arejczak.uptive.services;

import com.arejczak.uptive.dto.EventAddDTO;
import com.arejczak.uptive.dto.ParticipantAddDTO;
import com.arejczak.uptive.models.Event;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.repositories.ActivityRepository;
import com.arejczak.uptive.repositories.EventRepository;
import com.arejczak.uptive.repositories.LevelRepository;
import com.arejczak.uptive.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private LevelRepository levelRepository;

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }

    public Event getEvent(Long id){
        Optional<Event> event = eventRepository.findById(id);
        return event.orElse(null);
    }

    public ResponseEntity addEvent(EventAddDTO eventDTO){
        Event event = eventRepository.save(
                new Event(
                        userRepository.getUserByEmail(eventDTO.getEmail()).get(),
                        activityRepository.findByName(eventDTO.getActivity()).get(),
                        levelRepository.findByName(eventDTO.getLevel()).get(),
                        eventDTO.getLocation(),
                        eventDTO.getDate(),
                        eventDTO.getTime(),
                        eventDTO.getMessage(),
                        eventDTO.getRequired())
        );
        return new ResponseEntity<>(eventRepository.save(event), HttpStatus.OK);
    }


    public ResponseEntity addParticipant(ParticipantAddDTO participantDTO){
        Event event = eventRepository.findById((long)participantDTO.getEventId()).get();
        User user = userRepository.findById((long)participantDTO.getUserId()).get();
        event.addParticipant(user);
        eventRepository.save(event);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

}
