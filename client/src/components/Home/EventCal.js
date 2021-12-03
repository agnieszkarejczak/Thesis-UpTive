import React , { useState} from 'react'
import '../../styles/home.css';
import EventFullView from '../EventFullView.js';

const EventCal = (props) => {
    const emails = ['username@gmail.com', 'user02@gmail.com'];
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

    return (
        <div className='event-cal-container' >

            <p>{props.time}</p>
            <div className='event-cal' onClick={handleClickOpen}>
                <div className='event-cal-text'>
                    <h4>{props.activity.name}</h4>
                    <p>{props.location}</p>
                </div>
                {props.date} 
                <br></br>
                {console.log(props?.eventsParticipants)}    
            </div>
            <EventFullView
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            key                = {props?.id}
            activity           = {props?.activity} 
            assignedBy         = {props?.assignedBy}
            location           = {props?.location}
            time               = {props?.time}
            date               = {props?.date}
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
