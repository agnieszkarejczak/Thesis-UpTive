package com.arejczak.uptive.components;

import com.arejczak.uptive.dto.EventAddDTO;
import com.arejczak.uptive.dto.ParticipantAddDTO;
import com.arejczak.uptive.dto.UserActivityDTO;
import com.arejczak.uptive.dto.UserRegisterRequestDTO;
import com.arejczak.uptive.models.*;
import com.arejczak.uptive.repositories.*;
import com.arejczak.uptive.services.EventService;
import com.arejczak.uptive.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

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
        userService.addUser(new UserRegisterRequestDTO("email5@gmail.com","password","Aleksander","Koza","user"));
        userService.addUser(new UserRegisterRequestDTO("email6@gmail.com","password","Milena","Matyszczuk","user"));
        userService.addUser(new UserRegisterRequestDTO("janek@gmail.com","password","Jan","Dubik","admin"));
    }
    private void changeUsersDetails(){
        userService.changeUserDetails(1,"av1.png","My super bio");
        userService.changeUserDetails(2,"av2.png","My super bio");
        userService.changeUserDetails(3,"av3.png","My super bio");
        userService.changeUserDetails(4,"av4.png","My super bio");
        userService.changeUserDetails(5,"av5.png","My super bio");
        userService.changeUserDetails(6,"av6.png","My super bio");
        userService.changeUserDetails(7,"av8.png","My super bio");
    }
    private void addEvent(){
        eventService.addEvent(new EventAddDTO("email1@gmail.com","Volleyball","MEDIUM","ul.Miodowa 3 ,Kraków",   "2021-12-20","08:00","Jakaś wiadomość",   7));
        eventService.addEvent(new EventAddDTO("email2@gmail.com","Swimming"  ,"LOW"   ,"ul.Majora 10 ,Kraków",   "2021-06-10","10:30","Jakaś wiadomość",   5));
        eventService.addEvent(new EventAddDTO("email4@gmail.com","Fitness"   ,"HARD"  ,"ul.Opolska 8 ,Kraków",   "2021-06-19","17:00","Jakaś wiadomość",   3));
        eventService.addEvent(new EventAddDTO("email5@gmail.com","Climbing"  ,"HARD"  ,"ul.Opolska 8 ,Kraków",   "2021-06-22","17:00","Jakaś wiadomość",   5));
        eventService.addEvent(new EventAddDTO("email2@gmail.com","Volleyball","MEDIUM","ul.Warszawska 5 ,Kraków","2021-06-26","17:00","Jakaś wiadomość",6));
        eventService.addEvent(new EventAddDTO("email1@gmail.com","Volleyball","HARD"  ,"ul.Miodowa 3 ,Kraków",   "2021-06-30","10:30","Jakaś wiadomość",   6));
        eventService.addEvent(new EventAddDTO("email3@gmail.com","Swimming"  ,"MEDIUM","ul.Majora 10 ,Kraków",   "2021-06-08","19:00","Jakaś wiadomość",   6));
        eventService.addEvent(new EventAddDTO("email6@gmail.com","Basketball","LOW"   ,"ul.Pawia 2 ,Kraków",     "2021-06-12","18:00","Jakaś wiadomość",     6));
        eventService.addEvent(new EventAddDTO("email3@gmail.com","Football"  ,"HARD"  ,"ul.Lubicz 1 ,Kraków",    "2021-06-31","18:00","Jakaś wiadomość",    6));
        eventService.addEvent(new EventAddDTO("email3@gmail.com","Football"  ,"HARD"  ,"ul.Lubicz 1 ,Kraków",    "2021-07-01","18:00","Jakaś wiadomość",    6));
        eventService.addEvent(new EventAddDTO("janek@gmail.com","Swimming"  ,"HARD"  ,"ul.Miodowa 1 ,Kraków",    "2021-07-12","17:00","Jakaś wiadomość",    6));
    }
    private void addParticipants(){
        eventService.addParticipant(new ParticipantAddDTO(1,5));
        eventService.addParticipant(new ParticipantAddDTO(1,2));
        eventService.addParticipant(new ParticipantAddDTO(1,3));
        eventService.addParticipant(new ParticipantAddDTO(1,4));
        eventService.addParticipant(new ParticipantAddDTO(1,6));
        eventService.addParticipant(new ParticipantAddDTO(2,1));
        eventService.addParticipant(new ParticipantAddDTO(11,1));
        eventService.addParticipant(new ParticipantAddDTO(11,2));
        eventService.addParticipant(new ParticipantAddDTO(11,3));
    }

    private void acceptParticipants(){
        eventService.acceptParticipant((long)1);
        eventService.acceptParticipant((long)2);
        eventService.acceptParticipant((long)3);
    }

    private void addUserActivities(){
        userService.addUserActivity(new UserActivityDTO( (long)1,(long)1));
        userService.addUserActivity(new UserActivityDTO( (long)1,(long)2));
        userService.addUserActivity(new UserActivityDTO( (long)1,(long)3));
        userService.addUserActivity(new UserActivityDTO( (long)2,(long)2));
        userService.addUserActivity(new UserActivityDTO( (long)2,(long)3));
        userService.addUserActivity(new UserActivityDTO( (long)7,(long)3));
        userService.addUserActivity(new UserActivityDTO( (long)7,(long)5));
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.addRoles();
        this.addActivities();
        this.addLevels();
        this.addUsers();
        this.changeUsersDetails();
        this.addEvent();
        this.addParticipants();
        this.acceptParticipants();
        this.addUserActivities();
    }
}
