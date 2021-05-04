package com.arejczak.uptive.controllers;

import com.arejczak.uptive.dto.UserRegisterRequestDTO;
import com.arejczak.uptive.models.UserDetails;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final UserDetailsRepository userDetailsRepository;

    public UserController(UserService userService, RoleRepository roleRepository, UserDetailsRepository userDetailsRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.userDetailsRepository = userDetailsRepository;
    }

    @GetMapping({"","/"})
    public ResponseEntity getUsers(){
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public  ResponseEntity getUser(@PathVariable("id") Long id){
        return  new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity  addUser(@RequestBody UserRegisterRequestDTO user){
        return userService.addUser(user);
    }
}
