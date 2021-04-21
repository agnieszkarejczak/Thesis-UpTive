package com.arejczak.uptive.components;

import com.arejczak.uptive.models.Role;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.models.UserDetails;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.repositories.UserRepository;
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
    RoleRepository roleRepository;

    public DataLoader(UserRepository userRepository, UserService userService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    private void addRoles(){
        roleRepository.save(new Role((long)1,"user"));
        roleRepository.save(new Role((long)2,"admin"));
    }
    private void addUsers(){

        userService.addUser(new User("email1","password",roleRepository.findByName("user"), userDetailsRepository.save(new UserDetails("Andrzej","Nowak",null,null))));
        userService.addUser(new User("email2","password",roleRepository.findByName("user"), userDetailsRepository.save(new UserDetails("Edward","Mak",null,null))));
        userService.addUser(new User("email3","password",roleRepository.findByName("user"), userDetailsRepository.save(new UserDetails("Kornelia","Kos",null,null))));
        userService.addUser(new User("admin","admin",roleRepository.findByName("admin"), userDetailsRepository.save(new UserDetails("Alicja","Kowal",null,null))));

    }

    private void addUserDetails(){
        userDetailsRepository.save(new UserDetails("Andrzej","Nowak",null,null));
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.addRoles();
        this.addUserDetails();
    }
}
