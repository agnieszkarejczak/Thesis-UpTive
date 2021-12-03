import React from 'react'

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {Link} from 'react-router-dom'
import '../styles/search-events.css';

import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";
import Circle from './Circle';

const EventFullView = (props) => {

    const handleClose = () => {
      props.onClose(props.selectedValue);
    };
  
    const handleListItemClick = (value) => {
      props.onClose(value);
    };
    return (
        <Dialog 
            onClose={handleClose}
            onBackdropClick={handleClose}
            open={props.open}
        >
            


        <div className="event-container-full">
        <h1>Event Details</h1>
            <h2>Creator</h2>
                <Link to={`/Profile/${props.assignedBy.id}`}>
                    <img className='avatar-search' title={props.assignedBy.userDetails.name+" "+props.assignedBy.userDetails.surname} 
                    key={props.assignedBy.id} src={"/avatars/"+props.assignedBy.userDetails.avatar} alt='par'/>
                </Link>
                <h2>Participants</h2>
            <div className='participants'>
                
                {

                props.eventsParticipants.filter(p => p.added).map((p , index) => {
                
                return <Link to={`/Profile/${p.participant.id}`}>
                    <img title={p.participant.userDetails.name+" "+p.participant.userDetails.surname}  
                    className='avatar-search' key={p.participant.id} src={"/avatars/"+p.participant.userDetails.avatar} alt='par'/>
                </Link>     
                })
                }
            
            </div>
            <h2>General Data</h2>
            <br/>
            <h3>Activity Type: <b>{props.activity.name}</b></h3>
            <h3>
            <IconContext.Provider value={{ className: 'event-level'}}>
                        {/* Inline switch statement */}
                        
                    {
                        {
                            1: <div>Impact: <b>Low</b> <FaStar/><FaRegStar/><FaRegStar/></div>,
                            2: <div>Impact: <b>Medium</b> <FaStar/><FaStar/><FaRegStar/></div>,
                            3: <div>Impact: Hard<FaStar/><FaStar/><FaStar/></div>
                        }[props.level.id]
                    }
                        
                    </IconContext.Provider>
            </h3>
            <h3>Date and Time: <b>{props.date}  {props.time}</b></h3>
            <h3>Location: <b>{props.location}</b></h3>
            
        </div>
          
          

        </Dialog>
      );
    }

export default EventFullView
