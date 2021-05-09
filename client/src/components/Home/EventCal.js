import React from 'react'
import '../../styles/home.css';

const EventCal = () => {
    return (
        <div className='event-cal-container'>
            <p>10:30</p>
            <div className='event-cal'>
                <div className='event-cal-text'>
                    <h4>Swimming</h4>
                    <p>KRAKOW,KROWODRZA GORKA</p>
                </div>
                <p>
                18
                <br></br>
                Mar
                </p>          
                {/* <i class="fas fa-home"></i> */}

     
            </div>
        </div>
        
    )
}

export default EventCal
