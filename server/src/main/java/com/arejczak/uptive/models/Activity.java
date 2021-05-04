package com.arejczak.uptive.models;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="activity")
@Table(name="activity")
public class Activity {
    @Id
    @SequenceGenerator(
            name = "activity_sequence",
            sequenceName = "activity_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "activity_sequence"
    )
    @Column(name="activity_id")
    private Long id;

    @NotNull
    @Column(name="name", unique=true)
    private String name;

    @ManyToMany(mappedBy="userActivities")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<UserDetails> users;

    public Activity(@NotNull String name) {
        this.name = name;
        this.users = new HashSet<>();
    }

    public Activity() {
    }

    public void addUser(UserDetails user){
        this.users.add(user);
        user.getUserActivities().add(this);
    }

    public Set<UserDetails> getUsers() {
        return users;
    }

    public void setUsers(Set<UserDetails> users) {
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
