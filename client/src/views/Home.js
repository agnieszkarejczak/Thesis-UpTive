import React, {useEffect, useState} from 'react'
import '../styles/index.css';
import '../styles/home.css';
import Event from '../components/Home/Event';
import EventCal from '../components/Home/EventCal';
import EventSearch from '../components/SearchEvents/EventSearch';
import HomeHeader from '../components/Home/HomeHeader';
import {Api} from '../apiHandler/apiHandler';
import {Link} from 'react-router-dom'

const Home = () => {

    const [events, setEvents] = useState({
        events: []
    });
    const [currentUser, setCurrentUser] = useState({});
    const [changes,setChanges]=useState(0);

    const userActivitiesNames=currentUser?.userDetails?.userActivities.map(a =>a.name);

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
                

                {events?.events
                        .filter(e => 
                            e?.assignedBy.id !== currentUser?.id
                                && 
                                e?.eventsParticipants?.filter(p=>p.participant.id === currentUser?.id).length !==0
                                
                                && 
                                e?.eventsParticipants?.filter(p=>p.participant.id !== currentUser?.id)[0]?.added
                            &&
                            new Date(e?.startDate+"T"+e?.startTime+":00")>=Date.now()
                            &&
                            userActivitiesNames?.includes(e?.activity.name)
                            )
                            .sort(function(a,b){
                                // console.log(new Date(b.date+"T"+b.time+":00"));
                                return new Date(a.startDate+"T"+a.startTime+":00")-new Date(b.startDate+"T"+b.startTime+":00");
                            })
                            .map(e => { 
                                return <Event
                                setChanges={setChanges}
                                changes={changes} 
                                key={e.id}
                                id={e.id}
                                assignedBy={e?.assignedBy}
                                currentUser = {currentUser?.id}
                                participant={currentUser}
                                activity={e?.activity}
                                location = {e?.location}
                                startTime = {e?.startTime}
                                startDate = {e?.startDate}
                                endTime = {e?.endTime}
                                endDate = {e?.endDate}
                                message = {e?.message}
                                created_at = {e?.created_at}
                                eventsParticipants = {e?.eventsParticipants}
                                level = {e?.level}

                            />
                        })}
{events?.events.map(e =>{
                    if(e.assignedBy.id === currentUser?.id){
                        return e.eventsParticipants.filter(p => !p.added).map(p => {
       
                                return <Event
                                    setChanges={setChanges}
                                    changes={changes} 
                                    key={p.id}
                                    id={p.id}
                                    assignedBy={e?.assignedBy}
                                    currentUser = {currentUser?.id}
                                    participant={p?.participant}
                                    activity={e?.activity}
                                    location = {e?.location}
                                    startTime = {e?.startTime}
                                    startDate = {e?.startDate}
                                    endTime = {e?.endTime}
                                    endDate = {e?.endDate}
                                    message = {e?.message}
                                    created_at = {e?.created_at}
                                    eventsParticipants = {e?.eventsParticipants}
                                    level = {e?.level}

                                />
                            
                        })
                    }
                    
                })}
                </div>
                <div className='column'>
                    
                    <Link to='/EventForm'  className='btn-add'>
                        
                        ADD EVENT
                    </Link>
                    <div className='events'>

                        {events?.events
                        .filter(e => 
                            (e?.assignedBy.id === currentUser?.id
                            || 
                                (e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id).length !==0
                                && 
                                e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id)[0].added)
                            )
                            &&
                            new Date(e?.startDate+"T"+e?.startTime+":00")>=Date.now()
                            )
                        .sort(function(a,b){
                            // console.log(new Date(b.date+"T"+b.time+":00"));
                            return new Date(a.startDate+"T"+a.startTime+":00")-new Date(b.startDate+"T"+b.startTime+":00");
                        })
                        .map(e =>{
                            return <EventCal
                            key={e?.id}
                            activity={e?.activity}
                            currentUser = {currentUser?.id} 
                            assignedBy={e?.assignedBy}
                            location = {e?.location}
                            startTime = {e?.startTime}
                            startDate = {e?.startDate}
                            endTime = {e?.endTime}
                            endDate = {e?.endDate}
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
                    
                        {events?.events
                        .filter(e => 
                            (e?.assignedBy.id != currentUser?.id
                                && 
                                e?.eventsParticipants.filter(p=>p.participant.id === currentUser?.id).length ===0 
                            )
                            &&
                            new Date(e?.startDate+"T"+e?.startTime+":00")>=Date.now()
                            &&
                            userActivitiesNames?.includes(e?.activity.name)
                            ).map(e => { 
                            return <EventSearch 
                            setChanges={setChanges}
                            changes={changes}
                            key={e?.id}
                            id={e?.id}
                            currentUser={currentUser?.id}
                            activity={e?.activity} 
                            assignedBy={e?.assignedBy}
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
                
                </div>
            </div>

            
        </div>
    )
}

export default Home
