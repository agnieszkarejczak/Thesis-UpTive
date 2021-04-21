package com.arejczak.uptive.models;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity()
@Table(
        name="users",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_user_email",
                columnNames = {"email"}
        )
)
public class User implements Serializable {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_sequence"
    )
    @Column(name="id_user")
    private Long id;

    @Column(name="email")
    private String email;

    @NotNull
    @Column(name="password")
    private String password;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name="role_id",
            referencedColumnName = "role_id",
            foreignKey = @ForeignKey(name="fk_user_role")
    )
    private Role role;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name="user_details_id",
            referencedColumnName = "user_details_id",
            foreignKey = @ForeignKey(name="fk_user_details")
    )
    private UserDetails userDetails;


    public User() {

    }

    public User(String email, @NotNull String password, Role role, UserDetails userDetails) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.userDetails = userDetails;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
