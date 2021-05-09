import React from 'react'
import '../../styles/home.css';
import EventCal from './EventCal';

const EventsCal = () => {
    return (
        <div className='events'>
            <div className='title'>TODAY</div>
            <EventCal/>
            <div className='title'>THIS WEEK</div>
            <EventCal/>
            <EventCal/>
            <EventCal/>
            <div className='title'>THIS MONTH</div>
            <EventCal/>
            <EventCal/>
            <EventCal/>
        </div>
    )
}

export default EventsCal
