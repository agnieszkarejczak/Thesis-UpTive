import React , { useState} from 'react'
import '../../styles/home.css';
import EventFullView from '../EventFullView.js';

const EventCal = (props) => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };

    return (
        <div className='event-cal-container' >

            <p>{props.startTime}</p>
            <div className='event-cal' onClick={handleClickOpen}>
                <div className='event-cal-text'>
                    <h4>{props.activity.name}</h4>
                    <p>{props.location}</p>
                </div>
                {props.startDate} 
                <br></br>
                {console.log(props?.eventsParticipants)}    
            </div>
            <EventFullView
            open={open}
            onClose={handleClose}
            key                = {props?.id}
            activity           = {props?.activity} 
            assignedBy         = {props?.assignedBy}
            currentUser        = {props?.currentUser}
            location           = {props?.location}
            startTime          = {props?.startTime}
            startDate          = {props?.startDate}
            endTime            = {props?.endTime}
            endDate            = {props?.endDate}
            message            = {props?.message}
            required           = {props?.required}
            created_at         = {props?.created_at}
            eventsParticipants = {props?.eventsParticipants}
            level              = {props?.level}
            />
        </div>
        
    )
}

export default EventCal
