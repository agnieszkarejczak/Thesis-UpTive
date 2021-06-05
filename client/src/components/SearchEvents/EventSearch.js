import React from 'react'
import '../../styles/search-events.css';
import Circle from '../Circle';
import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";

const EventSearch = (props) => {



    return (
        <div className='event-search'>
            <div className='participants'>
            <img className='avatar-search' key={props.assignedBy.id} src={"avatars/"+props.assignedBy.userDetails.avatar} alt='par'/>
                {

                    props.participants.map((p , index) => {
                        if(index < 3){
                            return <img className='avatar-search' key={p.id} src={"avatars/"+p.userDetails.avatar} alt='par'/>
                        }
                        else if(index===3){
                            return <div className='avatar-search'> 
                            {props.participants.length-3}
                            </div>
                        }
                        
                        
                    })
                }
            </div>
            <div className='event-search-info'>
            <ul>
                <li className='li-activity'>
                    {props.activity.name} 
                    <IconContext.Provider value={{ className: 'event-level'}}>
                        {/* Inline switch statement */}
                    {
                        {
                            1: <div><FaStar/><FaRegStar/><FaRegStar/></div>,
                            2: <div><FaStar/><FaStar/><FaRegStar/></div>,
                            3: <div><FaStar/><FaStar/><FaStar/></div>
                        }[props.level.id]
                    }
                        
                    </IconContext.Provider>
                    
                </li>
                <li>{props.location} </li>
                <li>{props.date}  {props.time}</li>
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
