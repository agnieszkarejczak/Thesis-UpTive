package com.arejczak.uptive.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.Set;

import static javax.persistence.GenerationType.AUTO;

@Entity(name="role")
@Table(
        name="role",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_role_name",
                columnNames = {"name"}
        )
)
public class Role {

    @Id
    @GeneratedValue(
            strategy = AUTO
    )
    @Column(name="role_id")
    private Long id;

    @NotNull
    @Column(name="name")
    private String name;


    public Role() {
    }

    public Role(Long id, @NotNull String name) {
        this.id = id;
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
