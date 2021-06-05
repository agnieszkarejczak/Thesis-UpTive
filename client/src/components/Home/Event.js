import React from 'react'
import '../../styles/home.css';
import '../../styles/search-events.css';
import ButtonProgress from '../ButtonProgress';

const Event = () => {
    return (
        <div className='event'>
            <ul>
                <li className='li-activity-event'>Swimming</li>
                <li>KRAKOW,KROWODRZA</li>
                <li>20.03.2021, Saturday    10:30</li>
            </ul>
            <ButtonProgress text='Accept'/>
            <ButtonProgress text='Reject'/>
            <img className='avatar-search' src='avatars/basic.jpg' alt='par'/>
        </div>
    )
}

export default Event
