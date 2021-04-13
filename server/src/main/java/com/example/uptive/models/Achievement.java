package com.example.uptive.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "achievement")
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title",nullable=false)
    private String title;

    @Column(name="text",nullable=false)
    private String text;

    @Column(name="img",nullable=false)
    private String img;

    @ManyToMany(mappedBy = "usersAchievements")
    private Set<UserDetails> usersDetails;

    public Achievement(String title, String text, String img) {
        this.title = title;
        this.text = text;
        this.img = img;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
