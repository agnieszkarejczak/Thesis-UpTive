package com.example.uptive.models;

import javax.persistence.*;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="location",nullable=false)
    private String location;

    @Column(name="date",nullable=false)
    private String date;

    @Column(name="time",nullable=false)
    private String time;

    @Column(name="message",nullable=false)
    private String message;

    @Column(name="created_at",nullable=false)
    private String created_at;

    @Column(name="level",nullable=false)
    private Level level;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "activity_id")
    private Activity activity;

}
