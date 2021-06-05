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
        activityRepository.save(new Activity("Climbing"));
        activityRepository.save(new Activity("Jogging"));
        activityRepository.save(new Activity("Basketball"));
        activityRepository.save(new Activity("Football"));
    }
    private void addLevels(){
        levelRepository.save(new Level("LOW"));
        levelRepository.save(new Level("MEDIUM"));
        levelRepository.save(new Level("HARD"));
    }
    private void addUsers(){
        userService.addUser(new UserRegisterRequestDTO("email1@gmail.com","password","Anna","Kral","user"));
        userService.addUser(new UserRegisterRequestDTO("email2@gmail.com","password","Alicja","Kowal","user"));
        userService.addUser(new UserRegisterRequestDTO("email3@gmail.com","password","Piotr","Matysek","user"));
        userService.addUser(new UserRegisterRequestDTO("email4@gmail.com","password","Karolina","Sikora","user"));
        userService.addUser(new UserRegisterRequestDTO("email5@gmail.com","password","Aleksandra","Koza","user"));
        userService.addUser(new UserRegisterRequestDTO("email6@gmail.com","password","Milena","Matyszczuk","user"));
        userService.addUser(new UserRegisterRequestDTO("janek@gmail.com","password","Jan","Anys","admin"));
    }
    private void addEvent(){
        eventService.addEvent(new EventAddDTO("email1@gmail.com","Volleyball","MEDIUM","ul.Miodowa 3 ,Kraków","20-12-2021","08:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email2@gmail.com","Swimming"  ,"LOW"   ,"ul.Majora 10 ,Kraków","10-06-2021","10:30","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email4@gmail.com","Fitness"   ,"HARD"  ,"ul.Opolska 8 ,Kraków","19-06-2021","17:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email5@gmail.com","Climbing"   ,"HARD"  ,"ul.Opolska 8 ,Kraków","22-06-2021","17:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email2@gmail.com","Volleyball"   ,"MEDIUM"  ,"ul.Warszawska 5 ,Kraków","26-06-2021","17:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email1@gmail.com","Volleyball"   ,"HARD"  ,"ul.Miodowa 3 ,Kraków","30-06-2021","10:30","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email3@gmail.com","Swimming"   ,"MEDIUM"  ,"ul.Majora 10 ,Kraków","08-06-2021","19:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email6@gmail.com","Basketball"   ,"LOW"  ,"ul.Pawia 2 ,Kraków","12-06-2021","18:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email3@gmail.com","Football"   ,"HARD"  ,"ul.Lubicz 1 ,Kraków","31-06-2021","18:00","Jakaś wiadomość"));
        eventService.addEvent(new EventAddDTO("email3@gmail.com","Football"   ,"HARD"  ,"ul.Lubicz 1 ,Kraków","01-07-2021","18:00","Jakaś wiadomość"));
    }
    private void addParticipants(){
        eventService.addParticipant(eventRepository.findById((long)1).get(),userRepository.findById((long)5).get());
        eventService.addParticipant(eventRepository.findById((long)1).get(),userRepository.findById((long)2).get());
        eventService.addParticipant(eventRepository.findById((long)1).get(),userRepository.findById((long)3).get());
        eventService.addParticipant(eventRepository.findById((long)1).get(),userRepository.findById((long)4).get());
        eventService.addParticipant(eventRepository.findById((long)1).get(),userRepository.findById((long)6).get());
        eventService.addParticipant(eventRepository.findById((long)2).get(),userRepository.findById((long)1).get());
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
