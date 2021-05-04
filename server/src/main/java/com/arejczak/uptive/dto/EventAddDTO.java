package com.arejczak.uptive.dto;

public class EventAddDTO {
    private String email;
    private String activity;
    private String level;
    private String location;
    private String date;
    private String time;
    private String message;

    public EventAddDTO(String email, String activity, String level, String location, String date, String time, String message) {
        this.email = email;
        this.activity = activity;
        this.level = level;
        this.location = location;
        this.date = date;
        this.time = time;
        this.message =message;
    }

    public EventAddDTO() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
