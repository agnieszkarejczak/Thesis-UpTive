import React from 'react'

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {Link} from 'react-router-dom'
import '../styles/search-events.css';

import {FaRegStar,FaStar} from 'react-icons/fa'
import { IconContext } from "react-icons";
import Circle from './Circle';
import Swal from "sweetalert2";
import {Api} from '../apiHandler/apiHandler';
import {API_KEY,CLIENT_ID,DISCOVERY_DOCS,SCOPES} from '../const/const.js'

const EventFullView = (props) => {


    let gapi = window.gapi
    

    const addEvent = (event) =>{
        gapi.load('client:auth2', () => {
  
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
      
            gapi.client.load('calendar', 'v3')
      
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              
              var event_google = {
                'summary': props.activity.name,
                'location': props.location,
                'description': props.message,
                'start': {
                  'dateTime': props.startDate+'T'+props.startTime+':00',
                  'timeZone': 'Europe/Warsaw'
                },
                'end': {
                  'dateTime': props.endDate+'T'+props.endTime+':00',
                  'timeZone': 'Europe/Warsaw'
                }

              }
      
              let request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event_google,
              })
      
              request.execute(eventg => {
                window.open(eventg.htmlLink)
              })
      
            })
          })
    } 

    const handleClose = () => {
      props.onClose(props.selectedValue);
    };
  
    const handleListItemClick = (value) => {
      props.onClose(value);
    };

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
            <h3>Still required: <b>{props.required}</b></h3>
            <br/><br/>
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
            <h3>Start Date and Time: <b>{props.startDate}  {props.startTime}</b></h3>
            <h3>Start Date and Time: <b>{props.endDate}  {props.endTime}</b></h3>
            <h3>Location: <b>{props.location}</b></h3>
            <br/>

            {/* {console.log(props?.eventsParticipants.filter(p=>p.participant.id === props?.currentUser ).length ===0)}
            {console.log(props?.currentUser !== props?.assignedBy.id)}
            {console.log("My"+props?.currentUser)}
            {console.log(props?.eventsParticipants)} */}

            {/* Something doesn't work */}
            {/* {
            props?.eventsParticipants.filter(p=>p.participant.id === props?.currentUser ).length ===0 || props?.currentUser !== props?.assignedBy.id?
            
                <button className='request-button' onClick={onClick}>REQUEST</button> :
                <br/>
            }
             {
            props?.eventsParticipants.filter(p=>p.participant.id === props?.currentUser).length !==0 
            && !props?.eventsParticipants.filter(p=>p.participant.id === props?.currentUser )[0].added
            && props?.currentUser !== props?.assignedBy.id?
            
                <button className='request-button'>Already Requested</button>:
                <br/>
            } */}
            <br/>
            <br/>
            <button className='request-button' onClick={addEvent}>Add To Google Calendar</button>
            
        </div>
          
          

        </Dialog>
      );
    }

export default EventFullView
