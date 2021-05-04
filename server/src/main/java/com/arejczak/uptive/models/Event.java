package com.arejczak.uptive.models;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="event")
@Table(name="event")
public class Event implements Serializable {
    @Id
    @SequenceGenerator(
            name = "event_sequence",
            sequenceName = "event_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "event_sequence"
    )
    @Column(name="id_event")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="assigned_by_id",
            referencedColumnName = "users_id",
            foreignKey = @ForeignKey(name="fk_user_assigned_by")
    )
    private User assignedBy;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="activity_id",
            referencedColumnName = "activity_id",
            foreignKey = @ForeignKey(name="fk_activity")
    )
    private Activity activity;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="level_id",
            referencedColumnName = "level_id",
            foreignKey = @ForeignKey(name="fk_level")
    )
    private Level level;

    @NotNull
    @Column(name="location")
    private String location;

    @NotNull
    @Column(name="date")
    private String date;

    @NotNull
    @Column(name="time")
    private String time;

    @Column(name="message")
    private String message;

    @Column(name="created_at")
    private LocalDate created_at;

    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinTable(
        name = "event_participant",
                joinColumns = {@JoinColumn(name = "event_id")},
        inverseJoinColumns = {@JoinColumn(name = "participant_id")}
    )
    private Set<User> participants;

    public Event(User assignedBy, Activity activity,Level level, @NotNull String location, @NotNull String date, @NotNull String time, String message) {
        this.assignedBy = assignedBy;
        this.activity = activity;
        this.level =level;
        this.location = location;
        this.date = date;
        this.time = time;
        this.message = message;
        this.created_at = LocalDate.now();
        this.participants = new HashSet<>();
    }

    public Event() {
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }
    public void addParticipant(User participant) {
        this.participants.add(participant);
        participant.getEvents().add(this);
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(User assignedBy) {
        this.assignedBy = assignedBy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDate getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        this.created_at = created_at;
    }
}
