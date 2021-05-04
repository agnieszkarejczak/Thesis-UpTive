package com.arejczak.uptive.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="level")
@Table(name= "level")
public class Level {
    @Id
    @SequenceGenerator(
            name = "level_sequence",
            sequenceName = "level_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "level_sequence"
    )
    @Column(name="level_id")
    private Long id;

    @NotNull
    @Column(name="name",unique=true)
    private String name;

    public Level(@NotNull String name) {
        this.name = name;
    }

    public Level() {
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
