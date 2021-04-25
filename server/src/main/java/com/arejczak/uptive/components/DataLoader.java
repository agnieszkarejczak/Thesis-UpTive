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
        roleRepository.save(new Role("user"));
        roleRepository.save(new Role("admin"));
    }
    private void addUsers(){



        userService.addUser(new User("email1","password",roleRepository.findByName("user"), new UserDetails("Artur","Nowak", null, null)));
        userService.addUser(new User("email2","password",roleRepository.findByName("user"), new UserDetails("Alina","Kos", null, null)));
        userService.addUser(new User("email3","password",roleRepository.findByName("user"), new UserDetails("Maciej","Anys", null, null)));
        userService.addUser(new User("email4","password",roleRepository.findByName("admin"),new UserDetails("Krystyna","Mak", null, null)));
//        try {
//            userService.addUser(new User("email2","password",roleRepository.findByName("user"), det));
//        }
//        catch (Exception e) {
//            System.out.print(e.getMessage());
//            System.err.print("key already exists");
//        }

    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.addRoles();
        this.addUsers();
    }
}
