package com.example.uptive.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="surname")
    private String surname;

    @NotNull
    @Column(name="avatar")
    private String avatar;

    @NotNull
    @Column(name="bio")
    private String bio;

    @OneToOne(mappedBy="userDetails" ,cascade = CascadeType.ALL)
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_activities",
            joinColumns = {@JoinColumn(name = "user_details_id")},
            inverseJoinColumns = {@JoinColumn(name = "activity_id")}
    )
    private Set<Activity> usersActivities;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_achievements",
            joinColumns = {@JoinColumn(name = "user_details_id")},
            inverseJoinColumns = {@JoinColumn(name = "achievement_id")}
    )
    private Set<Activity> usersAchievements;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_socials",
            joinColumns = {@JoinColumn(name = "user_details_id")},
            inverseJoinColumns = {@JoinColumn(name = "social_id")}
    )
    private Set<Activity> usersSocials;

    public UserDetails(@NotNull String name, @NotNull String surname, @NotNull String avatar, @NotNull String bio, User user, Set<Activity> usersActivities, Set<Activity> usersAchievements, Set<Activity> usersSocials) {
        this.name = name;
        this.surname = surname;
        this.avatar = avatar;
        this.bio = bio;
        this.user = user;
        this.usersActivities = usersActivities;
        this.usersAchievements = usersAchievements;
        this.usersSocials = usersSocials;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Activity> getUsersActivities() {
        return usersActivities;
    }

    public void setUsersActivities(Set<Activity> usersActivities) {
        this.usersActivities = usersActivities;
    }

    public Set<Activity> getUsersAchievements() {
        return usersAchievements;
    }

    public void setUsersAchievements(Set<Activity> usersAchievements) {
        this.usersAchievements = usersAchievements;
    }

    public Set<Activity> getUsersSocials() {
        return usersSocials;
    }

    public void setUsersSocials(Set<Activity> usersSocials) {
        this.usersSocials = usersSocials;
    }
}
