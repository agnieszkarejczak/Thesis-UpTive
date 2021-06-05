import React, {useEffect, useState} from 'react'
import {Api} from '../apiHandler/apiHandler';
import EventSearch from '../components/SearchEvents/EventSearch'
import '../styles/index.css';
import '../styles/search-events.css';

const SearchEvents = () => {

    const [events, setEvents] = useState({
        events: []
    });

    useEffect(()=>{

        Api.events().then(response =>{
            if(response.status === 200){
                setEvents({events:response.data});
            }
        })
        .catch(error =>
            alert(error)
        );

    },[]);

    return (
        
        <div className='content content-search'>
            {events.events.map(e => { 
                return <EventSearch 
                key={e?.id}
                activity={e?.activity} 
                assignedBy={e?.assignedBy}
                location = {e?.location}
                time = {e?.time}
                date = {e?.date}
                message = {e?.message}
                created_at = {e?.created_at}
                participants = {e?.participants}
                level = {e?.level}
                />
            })}
            
        </div>
    )
}

export default SearchEvents
