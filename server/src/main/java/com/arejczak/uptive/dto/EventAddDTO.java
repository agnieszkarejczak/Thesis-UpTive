package com.arejczak.uptive.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EventAddDTO {
    private String email;
    private String activity;
    private String level;
    private String location;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String message;
    private int required;
}
