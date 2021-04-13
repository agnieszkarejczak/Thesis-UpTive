package com.example.uptive.models;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name="name",
            nullable=false
    )
    private String name;
    @OneToMany(mappedBy="role" ,cascade = CascadeType.ALL)
    private Set<User> user;
}
