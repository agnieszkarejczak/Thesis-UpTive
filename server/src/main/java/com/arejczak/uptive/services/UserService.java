package com.arejczak.uptive.services;

import com.arejczak.uptive.models.User;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public User addUser(User user){
        userRepository.save(user);
        return user;
    }
}
