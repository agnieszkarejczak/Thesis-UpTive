package com.example.uptive.models;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name="users")
public class User{

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1 //how much the sequence will increase from
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_sequence"
    )
    @Column(name="id")
    private Long id;

//    @NotEmpty
    @Column(name="email", unique = true, nullable = false)
    private String email;

    @Column(name="password",nullable=false)
    private String password;

    @Column(name="is_logged", nullable = false)
    private Boolean isLogged;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name="user_details_id",
            referencedColumnName = "id"
    )
    private UserDetails userDetails;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name="role_id",
            referencedColumnName = "id"
    )
    private Role role;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_event_participant",
            joinColumns = @JoinColumn(name="participant_id"),
            inverseJoinColumns = @JoinColumn(name="event.id")
    )
    private Set<Event> participant;


}
