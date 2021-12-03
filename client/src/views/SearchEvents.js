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
    const [search,setSearch]=useState('');


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
            <input onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search for events ..."></input>
           
            {events?.events.filter(e => 
                            (e?.assignedBy.id !== currentUser?.id
                            || 
                                (e?.eventsParticipants.filter(p=>p.participant.id !== currentUser?.id).length !==0
                                && 
                                e?.eventsParticipants.filter(p=>p.participant.id !== currentUser?.id)[0].added)
                            )
                            &&
                            new Date(e?.startDate+"T"+e?.startTime+":00")>=Date.now())
                            .filter(e => search !==0 && 
            (e?.activity.name.includes(search) || e?.location.includes(search) || e?.date.includes(search))).map(e => { 
                return <EventSearch 
                setChanges={setChanges}
                changes={changes}
                key={e?.id}
                id={e?.id}
                currentUser={currentUser?.id}
                activity={e?.activity} 
                assignedBy={e?.assignedBy}
                location = {e?.location}
                location = {e?.location}
                startTime = {e?.startTime}
                startDate = {e?.startDate}
                endTime = {e?.endTime}
                endDate = {e?.endDate}
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
