package com.arejczak.uptive.services;

import com.arejczak.uptive.dto.UserRegisterRequestDTO;
import com.arejczak.uptive.models.Activity;
import com.arejczak.uptive.models.Event;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.models.UserDetails;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private UserDetailsRepository userDetailsRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

//    public ResponseEntity addUser(User user){
//        if(userRepository.getUserByEmail(user.getEmail()).isPresent()){
//            return new ResponseEntity<>("User with that email already exist",HttpStatus.CONFLICT);
//        }
//        String salt = BCrypt.gensalt();
//        String hashpw = BCrypt.hashpw(user.getPassword(),salt);
//        user.setSalt(salt);
//        user.setPassword(hashpw);
//        user.setRole(roleRepository.findByName(user.getRole().getName()));
//        user.setUserDetails(userDetailsRepository.save( new UserDetails(user.getUserDetails().getName(),user.getUserDetails().getSurname(),null,null)));
//        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
//    }

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
                userDetailsRepository.save( new UserDetails(userDTO.getName(),userDTO.getSurname(),null,null))
        );
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    public ResponseEntity addUserActivity(UserDetails user, Activity activity){
        user.addActivity(activity);
        userDetailsRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
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
