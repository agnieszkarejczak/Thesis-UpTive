package com.arejczak.uptive.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParticipantAddDTO implements Serializable {
    private long eventId;
    private long userId;

}
