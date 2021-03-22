package com.example.uptive.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class FirstController {

    @RequestMapping(value="")
    @ResponseBody
    public List index(){
        return List.of("Hello", "Index");
    }
    @RequestMapping(value="profile")
    @ResponseBody
    public List profile(){
        return List.of("Hello", "profile");
    }
    @RequestMapping(value="home")
    @ResponseBody
    public List home(){
        return List.of("Hello", "home");
    }
    @RequestMapping(value="signUpIn")
    @ResponseBody
    public List signUpIn(){
        return List.of("Hello", "signUpIn");
    }
    @RequestMapping(value="searchEvents")
    @ResponseBody
    public List searchEvents(){
        return List.of("Hello", "searchEvents");
    }

    @RequestMapping(value="addEvent")
    @ResponseBody
    public List addEvent(){
        return List.of("Hello", "addEvent");
    }
}
