package com.arejczak.uptive.models;

import lombok.Getter;
import lombok.Setter;
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
    @Column(name="startDate")
    private String startDate;

    @NotNull
    @Column(name="startTime")
    private String startTime;

    @NotNull
    @Column(name="endDate")
    private String endDate;

    @NotNull
    @Column(name="endTime")
    private String endTime;

    @Column(name="message")
    private String message;

    @Column(name="required")
    private int required;

    @Column(name="created_at")
    private LocalDate created_at;

    @OneToMany(mappedBy = "event")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<EventParticipant> eventsParticipants;

//    @ManyToMany
//    @LazyCollection(LazyCollectionOption.FALSE)
//    @JoinTable(
//        name = "event_participant",
//                joinColumns = {@JoinColumn(name = "event_id")},
//        inverseJoinColumns = {@JoinColumn(name = "participant_id")}
//    )
//    private Set<User> participants;

    public Event(User assignedBy, Activity activity, Level level, String location, String startDate, String startTime,String endDate, String endTime, String message, int required) {
        this.assignedBy = assignedBy;
        this.activity = activity;
        this.level =level;
        this.location = location;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.message = message;
        this.required = required;
        this.created_at = LocalDate.now();
        this.eventsParticipants = new HashSet<>();
    }

    public Event() {
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Set<EventParticipant> getEventsParticipants() {
        return eventsParticipants;
    }

    public void setEventsParticipants(Set<EventParticipant> eventsParticipants) {
        this.eventsParticipants = eventsParticipants;
    }


//    public void addParticipant(EventParticipant eventParticipants) {
//        this.eventParticipants.add(participant);
//        eventParticipants.getEvents().add(this);
//    }

    public int getRequired() {
        return required;
    }

    public void setRequired(int required) {
        this.required = required;
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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
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
