import React from 'react'
import '../../styles/search-events.css';
import Circle from '../Circle';
import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";

const EventSearch = () => {
    return (
        <div className='event-search'>
            <div className='participants'>
                <img className='avatar-search' src='basic.jpg' alt='par'/>
                <img className='avatar-search' src='basic.jpg' alt='par'/>
                <img className='avatar-search' src='basic.jpg' alt='par'/>
                <div className='avatar-search'> +3</div>

            </div>
            <div className='event-search-info'>
            <ul>
                <li className='li-activity'>
                    Volleyball 
                    <IconContext.Provider value={{ className: 'event-level'}}>
                        <FaStar/><FaStar/><FaRegStar/>
                    </IconContext.Provider>
                    
                </li>
                <li>Kraków, ul. Pawia 10A</li>
                <li>20.03.2021  10:30</li>
            </ul>
            <Circle borderColor= '#907bdb' color='#907bdb' number={3} />
            </div>
            
            
            
            <button className='request-button'>REQUEST</button>
            {/* <div className='icons-bar'>
            <FaStar/><FaStar/><FaRegStar/> <FaStar/><FaStar/><FaRegStar/>
            </div> */}
            
        </div>
    )
}

export default EventSearch
