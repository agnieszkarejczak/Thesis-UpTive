package com.example.uptive.controllers;

import org.springframework.stereotype.Controller;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FirstController {

    @RequestMapping(value="")
    @GetMapping
    public List index(){
        return List.of("Hello", "Index");
    }
    @RequestMapping(value="profile")
    @GetMapping
    public List profile(){
        return List.of("Hello", "profile");
    }
    @RequestMapping(value="home")
    @GetMapping
    public List home(){
        return List.of("Hello", "home");
    }
    @RequestMapping(value="signUpIn")
    @GetMapping
    public List signUpIn(){
        return List.of("Hello", "signUpIn");
    }
    @RequestMapping(value="searchEvents")
    @GetMapping
    public List searchEvents(){
        return List.of("Hello", "searchEvents");
    }

    @RequestMapping(value="addEvent")
    @GetMapping
    public List addEvent(){
        return List.of("Hello", "addEvent");
    }
}
