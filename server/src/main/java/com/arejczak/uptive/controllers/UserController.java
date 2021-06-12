package com.arejczak.uptive.controllers;

import com.arejczak.uptive.dto.UserActivityDTO;
import com.arejczak.uptive.dto.UserRegisterRequestDTO;
import com.arejczak.uptive.payload.AuthRequest;
import com.arejczak.uptive.repositories.RoleRepository;
import com.arejczak.uptive.models.User;
import com.arejczak.uptive.repositories.UserDetailsRepository;
import com.arejczak.uptive.security.JwtUtil;
import com.arejczak.uptive.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/api/users")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

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

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody AuthRequest authRequest) throws Exception{
        String jwt;
        String rolesString="";
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
            jwt = jwtUtil.generateToken(authRequest.getEmail());
            UserDetails userDetailsImpl = (UserDetails) authentication.getPrincipal();
            List<String> roles = userDetailsImpl.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());
            for(var v : roles){
                rolesString+=v;
            }

        } catch (Exception ex) {
            return new ResponseEntity<>("Invalid credentials",HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(jwt,HttpStatus.OK);
    }

    @GetMapping({"","/"})
    public ResponseEntity getUsers(){
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public  ResponseEntity getUser(@PathVariable("id") Long id){
        return  new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @GetMapping(value = "/me")
    public ResponseEntity getMe(Authentication authentication, Principal principal) {
        return  new ResponseEntity<>(userService.getMe(authentication), HttpStatus.OK);

    }

    @PostMapping("/add")
    public ResponseEntity  addUser(@RequestBody UserRegisterRequestDTO user){
        return userService.addUser(user);
    }

    @PostMapping("/addActivity")
    public ResponseEntity  addUserActivity(@RequestBody UserActivityDTO userActivityDTO)
    {
        return userService.addUserActivity(userActivityDTO);
    }


}
