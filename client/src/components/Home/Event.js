import React, {useEffect, useState} from 'react'
import '../../styles/home.css';
import '../../styles/search-events.css';
import {Api} from '../../apiHandler/apiHandler';
import axios from "axios";
import Swal from "sweetalert2";
import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";
import {Link} from 'react-router-dom'

const Event = (props) => {

    const [currentUser, setCurrentUser] = useState({});


    useEffect(()=>{

        Api.me().then(response =>{
            if(response.status === 200){
                setCurrentUser(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );

    },[]);

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
    const viewEvent = ()=>{
        alert("hi")
    }
   

    return (
        <div className='event' >
            <ul onClick={viewEvent}>
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
                <li>{props.startDate+'  '+props.startTime}</li>
            </ul>
            {
                props?.participant.id == currentUser?.id?
                <div><br/><p >Waiting for acceptance</p> </div>:
                <div>
                    <button className='btn-progress' onClick={accept}>Accept</button>
                    <button className='btn-progress' onClick={reject}>Reject</button>
                
                    <Link to={`/Profile/${props.participant.id}`}>
                                    <img title={props.participant.userDetails.name+" "+props.participant.userDetails.surname}  
                                    className='avatar-search' key={props.participant.id} src={"/avatars/"+props.participant.userDetails.avatar} alt='par'/>
                                </Link>
                </div>


            }

        </div>
    )
}

export default Event
