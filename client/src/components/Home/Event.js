import React from 'react'
import '../../styles/home.css';
import '../../styles/search-events.css';
import {Api} from '../../apiHandler/apiHandler';
import axios from "axios";
import Swal from "sweetalert2";
import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";

const Event = (props) => {

    function accept(){
            Api.acceptParticipant(props.id).then(response =>{
            if(response.status === 200){
                props.setChanges(oldChange => oldChange+1);
                Swal.fire({
                    icon: 'success',
                    title: 'Participant added successfully!',
                    showConfirmButton: true
                })
            }
        })
        .catch(error =>
            console.log(error)
        );

    }

    function reject(){
        Api.rejectParticipant(props.id).then(response =>{
            if(response.status === 200){
                props.setChanges(oldChange => oldChange+1);
                Swal.fire({
                    icon: 'success',
                    title: 'Participant has been rejected!',
                    showConfirmButton: true
                })
            }
        })
        .catch(error =>
            console.log(error)
        );
    }
   

    return (
        <div className='event'>
            <ul>
                <li className='li-activity-event'>{props.activity.name}</li>
                <li className='li-activity-event'>
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

                <li>{props.location}</li>
                <li>{props.date+'  '+props.time}</li>
            </ul>
            <button className='btn-progress' onClick={accept}>Accept</button>
            <button className='btn-progress' onClick={reject}>Reject</button>

            <img className='avatar-search' title={props.participant.userDetails.name+" "+props.participant.userDetails.surname} 
             src={'avatars/'+props.participant.userDetails.avatar} alt='par'/>

            <a  href="http://localhost:8080/api/google?redirect_uri=http://localhost:3000/oauth2/redirect">Add to Google</a>
        </div>
    )
}

export default Event
