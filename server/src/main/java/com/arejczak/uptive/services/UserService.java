package com.arejczak.uptive.services;

import com.arejczak.uptive.models.User;
import com.arejczak.uptive.models.UserDetails;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public ResponseEntity addUser(User user){
        if(userRepository.getUserByEmail(user.getEmail()).isPresent()){
            return new ResponseEntity<>("User with that email already exist",HttpStatus.CONFLICT);
        }
        user.setRole(roleRepository.findByName(user.getRole().getName()));
        user.setUserDetails(userDetailsRepository.save( new UserDetails(user.getUserDetails().getName(),user.getUserDetails().getSurname(),null,null)));
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }
}
