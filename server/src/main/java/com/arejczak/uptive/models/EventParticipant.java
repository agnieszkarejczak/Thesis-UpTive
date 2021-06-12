package com.arejczak.uptive.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="event_participant")
@Table(
        name="event_participant",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_event_participant",
                columnNames = {"event_id","participant_id"}
        )
)
@NoArgsConstructor
@Getter
@Setter
public class EventParticipant implements Serializable {

    @Id
    @SequenceGenerator(
            name = "event_participant_sequence",
            sequenceName = "event_participant_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "event_participant_sequence"
    )
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="participant_id",
            foreignKey = @ForeignKey(name="fk_participant")
    )
    private User participant;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(
            name="event_id",
            foreignKey = @ForeignKey(name="fk_event")
    )
    private Event event;

    @Column(name="is_added")
    private boolean isAdded;

    public EventParticipant(User participant, Event event, boolean isAdded) {
        this.participant = participant;
        this.event = event;
        this.isAdded = isAdded;
    }
}
