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
                <p>
                    {/* TODO here only day ex. 18 */}
                {props.date} 
                <br></br>
                {/* TODO here only month ex. March */}

                </p>          
                {/* <i class="fas fa-home"></i> */}

     
            </div>
        </div>
        
    )
}

export default EventCal
