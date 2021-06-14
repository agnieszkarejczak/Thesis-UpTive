import React from 'react'
import '../../styles/home.css';

const EventCal = (props) => {
    return (
        <div className='event-cal-container'>
            <p>{props.time}</p>
            <div className='event-cal'>
                <div className='event-cal-text'>
                    <h4>{props.activity.name}</h4>
                    <p>{props.location}</p>
                </div>
                {props.date} 
                <br></br>


     
            </div>
        </div>
        
    )
}

export default EventCal
