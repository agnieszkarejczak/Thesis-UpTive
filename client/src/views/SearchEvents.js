import React, {useEffect, useState} from 'react'
import {Api} from '../apiHandler/apiHandler';
import EventSearch from '../components/SearchEvents/EventSearch'
import '../styles/index.css';
import '../styles/search-events.css';

const SearchEvents = () => {

    const [events, setEvents] = useState({
        events: []
    });
    const [currentUser, setCurrentUser] = useState({});
    const [changes,setChanges]=useState(0);


    useEffect(()=>{

        Api.me().then(response =>{
            if(response.status === 200){
                setCurrentUser(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );

        Api.events().then(response =>{
            if(response.status === 200){
                setEvents({events:response.data});
                console.log(response.data[0].eventsParticipants[0].participant.id);
            }
        })
        .catch(error =>
            console.log(error)
        );

    },[changes]);

    return (
        
        <div className='content content-search'>
            <input></input>
           
            {events?.events.map(e => { 
                return <EventSearch 
                setChanges={setChanges}
                changes={changes}
                key={e?.id}
                id={e?.id}
                currentUser={currentUser?.id}
                activity={e?.activity} 
                assignedBy={e?.assignedBy}
                location = {e?.location}
                time = {e?.time}
                date = {e?.date}
                message = {e?.message}
                created_at = {e?.created_at}
                required = {e?.required}
                eventsParticipants = {e?.eventsParticipants}
                level = {e?.level}
                />
            })}
            
        </div>
    )
}

export default SearchEvents
