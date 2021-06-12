package com.arejczak.uptive.models;


import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name="event_participant")
@Table(
        name="event_participant"
//        uniqueConstraints = @UniqueConstraint(
//                name = "uk_user_email",
//                columnNames = {"email"}
//        )
)
public class EventParticipant {
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


}
