import React from 'react'
import '../../styles/home.css';
import ButtonProgress from '../ButtonProgress';

const Event = () => {
    return (
        <div className='event'>
            <ul>
                <li><p>Swimming</p></li>
                <li>KRAKOW,KROWODRZA</li>
                <li>20.03.2021, Saturday    10:30</li>
            </ul>
            <ButtonProgress/>
            <ButtonProgress/>
            <ButtonProgress/>
        </div>
    )
}

export default Event
