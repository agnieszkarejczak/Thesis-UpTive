package com.arejczak.uptive.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Set;

import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="role")
@Table(
        name="role",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_role_name",
                columnNames = {"name"}
        )
)
public class Role implements Serializable {

    @Id
    @SequenceGenerator(
            name = "role_sequence",
            sequenceName = "role_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "role_sequence"
    )
    @Column(name="role_id")
    private Long id;

    @NotNull
    @Column(name="name")
    private String name;


    public Role() {
    }

    public Role(@NotNull String name) {
        this.name = name;
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
