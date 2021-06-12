package com.arejczak.uptive.services;

import com.arejczak.uptive.dto.UserActivityDTO;
import com.arejczak.uptive.dto.UserRegisterRequestDTO;
import com.arejczak.uptive.models.Activity;
import com.arejczak.uptive.models.Event;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.models.UserDetails;
import com.arejczak.uptive.repositories.ActivityRepository;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User getMe(Authentication authentication){
        return userRepository.getUserByEmail(authentication.getName()).get();
    }

    //Using DTO
    @Transactional
    public ResponseEntity addUser(UserRegisterRequestDTO userDTO){
        if(userRepository.getUserByEmail(userDTO.getEmail()).isPresent()){
            return new ResponseEntity<>("User with that email already exist",HttpStatus.CONFLICT);
        }
        String salt = BCrypt.gensalt();
        String hashpw = BCrypt.hashpw(userDTO.getPassword(),salt);
        if(userDTO.getRoleName() == null)
            userDTO.setRoleName("user");
        User user = new User(
                userDTO.getEmail(),
                hashpw,
                roleRepository.findByName(userDTO.getRoleName()),
                userDetailsRepository.save( new UserDetails(userDTO.getName(),userDTO.getSurname(),"basic.jpg",null))
        );
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    public ResponseEntity addUserActivity(UserActivityDTO userActivity){
        UserDetails userDetails = userRepository.findById((long)userActivity.getUserId()).get().getUserDetails();
        userDetails.addActivity(activityRepository.findById((long)userActivity.getActivityId()).get());
        userDetailsRepository.save(userDetails);
        return new ResponseEntity<>(userDetails, HttpStatus.OK);
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(email).get( );
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );
    }
}
