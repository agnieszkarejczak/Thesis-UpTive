import React, {useEffect, useState} from 'react'
import '../../styles/search-events.css';
import Circle from '../Circle';
import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";
import {Api} from '../../apiHandler/apiHandler';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Swal from "sweetalert2";
import {Link} from 'react-router-dom'

const EventSearch = (props) => {


    const addParticipant ={
        userId: props.currentUser,
        eventId: props.id
    };


    const onClick = ()=>{
        Api.addParticipant(addParticipant).then(response =>{
            if(response.status === 200){
                props.setChanges(oldChange => oldChange+1);
                Swal.fire({
                    icon: 'success',
                    title: 'Request sent!',
                    showConfirmButton: true
                })

            }
        })
        .catch(error =>
            Swal.fire({
                icon: 'error',
                title: 'Ups! something went wrong',
                text:'You cannot send request to this event',
                showConfirmButton: true
            })
            
        );    
    };

    return (
        <div className='event-search'>
            <div className='participants'>
                <Link to={`/Profile/${props.assignedBy.id}`}>
                <img className='avatar-search' title={props.assignedBy.userDetails.name+" "+props.assignedBy.userDetails.surname} 
            key={props.assignedBy.id} src={"/avatars/"+props.assignedBy.userDetails.avatar} alt='par'/>
                </Link>
                
           
                {

                    props.eventsParticipants.filter(p => p.added).map((p , index) => {

                            if(index < 3){
                                // return <Avatar></Avatar>
                                return <Link to={`/Profile/${p.participant.id}`}>
                                    <img title={p.participant.userDetails.name+" "+p.participant.userDetails.surname}  
                                    className='avatar-search' key={p.participant.id} src={"/avatars/"+p.participant.userDetails.avatar} alt='par'/>
                                </Link>
                                
                            }
                            else if(index===3){
                                return <div className='avatar-search'> 
                                {"+"+(props.eventsParticipants.filter(p => p.added).length-3)}
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
            {props.required?
            <Circle borderColor= '#907bdb' color='#907bdb' number={props.required-props.eventsParticipants.filter(p =>p.added === true).length} />
            :
            ""
            }
            
            </div>
            
            
            
            <button className='request-button' onClick={onClick}>REQUEST</button>
            {/* <div className='icons-bar'>
            <FaStar/><FaStar/><FaRegStar/> <FaStar/><FaStar/><FaRegStar/>
            </div> */}
            
        </div>
    )
}

export default EventSearch
