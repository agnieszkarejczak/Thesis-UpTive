package com.arejczak.uptive.controllers;

import com.arejczak.uptive.models.Role;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.repositories.UserRepository;
import com.arejczak.uptive.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping({"","/"})
    public ResponseEntity getUsers(){
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public  ResponseEntity getUser(@PathVariable("id") Long id){
        return  new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    //Temporary
//    @GetMapping("/add")
//    public ResponseEntity addUser(){
//        return new ResponseEntity<>(userService.addUser(new User("email3","password3",new Role((long)1,"user"))),
//                HttpStatus.OK);
//    }
}
