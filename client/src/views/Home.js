import React, {useEffect, useState} from 'react'

import '../styles/index.css';
import '../styles/home.css';
import Event from '../components/Home/Event';
import EventCal from '../components/Home/EventCal';
import EventSearch from '../components/SearchEvents/EventSearch';
import HomeHeader from '../components/Home/HomeHeader';
import TopActivities from '../components/TopActivities';
import {Api} from '../apiHandler/apiHandler';
/*TODO Popraw routing (signInUp wyświetl bez left bar ale żeby można było przejść stamtąd do home) */
const Home = () => {

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
            }
        })
        .catch(error =>
            console.log(error)
        );

    },[changes]);

    function countCalEvents(){
        return events?.events.filter( e => 
            e?.assignedBy.id === currentUser?.id
            || 
                (e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id).length !==0
                && 
                e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id)[0].added
            )).length
        
    }

    return (
        <div className='content'>
            <HomeHeader
                // inprogress={} 
                callendar={countCalEvents()}
            />                
            <div className='main-content'>
                <div className='column'>
                {events?.events.map(e =>{
                    if(e.assignedBy.id === currentUser?.id){
                        return e.eventsParticipants.filter(p => !p.added).map(p => {
       
                                return <Event
                                    setChanges={setChanges}
                                    changes={changes} 
                                    key={p.id}
                                    id={p.id}
                                    currentUser = {currentUser?.id}
                                    participant={p?.participant}
                                    activity={e?.activity}
                                    location = {e?.location}
                                    time = {e?.time}
                                    date = {e?.date}
                                    message = {e?.message}
                                    created_at = {e?.created_at}

                                />
                            
                        })
                    }
                    
                })}
                </div>
                <div className='column'>
                    
                    <div className='btn-add'>
                        {/* <i class="fas fa-plus"></i> */}
                        ADD EVENT
                    </div>
                    <div className='events'>
                        {events?.events.map(e =>{
                            if(            e?.assignedBy.id === currentUser?.id
                                || 
                                    (e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id).length !==0
                                    && 
                                    e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id)[0].added
                                ))
                            return <EventCal
                            key={e?.id}
                            activity={e?.activity} 
                            assignedBy={e?.assignedBy}
                            location = {e?.location}
                            time = {e?.time}
                            date = {e?.date}
                            message = {e?.message}
                            required = {e?.required}
                            created_at = {e?.created_at}
                            eventsParticipants = {e?.eventsParticipants}
                            level = {e?.level}
                            />
                        })}
                        {/* <div className='title'>TODAY</div>

                        <div className='title'>THIS WEEK</div>

                        <div className='title'>THIS MONTH</div> */}

                    </div>
                </div>
                <div className='recommended-top-container'>
                    <div className='recommended'>
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
                    <div className='top-activ'>
                        Top Activities
                        <TopActivities borderColor= '#907bdb' color='#907bdb' number={3}/>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Home
