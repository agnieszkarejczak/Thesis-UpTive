package com.arejczak.uptive.components;

import com.arejczak.uptive.dto.EventAddDTO;
import com.arejczak.uptive.dto.UserRegisterRequestDTO;
import com.arejczak.uptive.models.*;
import com.arejczak.uptive.repositories.*;
import com.arejczak.uptive.services.EventService;
import com.arejczak.uptive.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    LevelRepository  levelRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ActivityRepository activityRepository;

    public DataLoader(UserRepository userRepository, UserService userService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    private void addRoles(){
        roleRepository.save(new Role("user"));
        roleRepository.save(new Role("admin"));
    }
    private void addActivities(){
        activityRepository.save(new Activity("Volleyball"));
        activityRepository.save(new Activity("Swimming"));
        activityRepository.save(new Activity("Fitness"));
    }
    private void addLevels(){
        levelRepository.save(new Level("LOW"));
        levelRepository.save(new Level("MEDIUM"));
        levelRepository.save(new Level("HARD"));
    }
    private void addUsers(){
        userService.addUser(new UserRegisterRequestDTO("email1","password","Anna","Kral","user"));
        userService.addUser(new UserRegisterRequestDTO("email2","password","Alicja","Kowal","user"));
        userService.addUser(new UserRegisterRequestDTO("email3","password","Piotr","Matysek","user"));
        userService.addUser(new UserRegisterRequestDTO("email4","password","Jan","Anys","admin"));
    }
    private void addEvent(){
        eventService.addEvent(new EventAddDTO("email1","Volleyball","MEDIUM","Lokalizacja","Data","Czas","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email2","Swimming"  ,"LOW"   ,"Lokalizacja","Data","Czas","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email3","Fitness"   ,"HARD"  ,"Lokalizacja","Data","Czas","Jakaś wiadomość"));
    }
    private void addParticipants(){
        eventService.addParticipant(eventRepository.findById((long)1).get(),userRepository.findById((long)1).get());
    }

    private void addUserActivities(){
        userService.addUserActivity(userDetailsRepository.findById(userRepository.findById((long) 2).get().getId()).get(), activityRepository.findByName("Volleyball").get());
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.addRoles();
        this.addActivities();
        this.addLevels();
        this.addUsers();
        this.addEvent();
        this.addParticipants();
        this.addUserActivities();
    }
}
