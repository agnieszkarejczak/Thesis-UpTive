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

@Entity(name="users")
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
    @Column(name="users_id")
    private Long id;

    @Column(name="email")
    private String email;

    @NotNull
    @Column(name="password")
    private String password;

    @Column(name="salt")
    private String salt;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="role_id",
            referencedColumnName = "role_id",
            foreignKey = @ForeignKey(name="fk_user_role")
    )
    private Role role;

    @OneToOne(optional = false)
    @JoinColumn(
            name="user_details_id",
            referencedColumnName = "user_details_id",
            foreignKey = @ForeignKey(name="fk_user_details")
    )
    private UserDetails userDetails;

    @JsonIgnore
    @OneToMany(mappedBy = "participant")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<EventParticipant> eventsParticipants;

    public User() {

    }

    public User(String email, @NotNull String password, Role role, UserDetails userDetails) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.userDetails = userDetails;
        this.eventsParticipants = new HashSet<>();
    }

    public Set<EventParticipant> getEventsParticipants() {
        return eventsParticipants;
    }

    public void setEventsParticipants(Set<EventParticipant> eventsParticipants) {
        this.eventsParticipants = eventsParticipants;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
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
