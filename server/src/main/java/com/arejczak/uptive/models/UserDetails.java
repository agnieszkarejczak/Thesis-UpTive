package com.arejczak.uptive.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="user_details")
@Table(name="user_details")
public class UserDetails implements Serializable {
    @Id
    @SequenceGenerator(
            name = "user_details_sequence",
            sequenceName = "user_details_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_details_sequence"
    )
    @Column(name="user_details_id")
    private Long id;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="surname")
    private String surname;

    @Column(name="avatar")
    private String avatar;

    @Column(name="bio")
    private String bio;

    @JsonIgnore
    @OneToOne(mappedBy = "userDetails")
    private User user;

    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinTable(
            name = "user_activity",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "activity_id")}
    )
    private Set<Activity> userActivities;

    public UserDetails(@NotNull String name, @NotNull String surname, String avatar, String bio) {
        this.name = name;
        this.surname = surname;
        this.avatar = avatar;
        this.bio = bio;
        this.userActivities = new HashSet<>();
    }

    public UserDetails() {
    }

    public void addActivity(Activity activity){
        this.userActivities.add(activity);
        activity.getUsers().add(this);
    }

    public Set<Activity> getUserActivities() {
        return userActivities;
    }

    public void setUserActivities(Set<Activity> userActivities) {
        this.userActivities = userActivities;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
