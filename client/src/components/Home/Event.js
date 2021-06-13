import React from 'react'
import '../../styles/home.css';
import '../../styles/search-events.css';
import {Api} from '../../apiHandler/apiHandler';
import axios from "axios";
import Swal from "sweetalert2";

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
                <li>{props.location}</li>
                <li>{props.date+'  '+props.time}</li>
            </ul>
            <button className='btn-progress' onClick={accept}>Accept</button>
            <button className='btn-progress' onClick={reject}>Reject</button>

            <img className='avatar-search' src={'avatars/'+props.participant.userDetails.avatar} alt='par'/>
        </div>
    )
}

export default Event
