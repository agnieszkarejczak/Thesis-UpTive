import React, {useEffect, useState} from 'react'

import '../styles/index.css';
import '../styles/home.css';
import Events from '../components/Home/Events';
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

    useEffect(()=>{

        Api.me().then(response =>{
            if(response.status === 200){
                setCurrentUser(response.data);
            }
        })
        .catch(error =>
            alert(error)
        );

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
        <div className='content'>
            <HomeHeader />                
            <div className='main-content'>
                <div className='column'>
                    <Events />
                </div>
                <div className='column'>
                    
                    <div className='btn-add'>
                        {/* <i class="fas fa-plus"></i> */}
                        ADD EVENT
                    </div>
                    <div className='events'>
                        {console.log(currentUser)}
                        {events.events.map(e =>{
                            if(e?.assignedBy.id === currentUser?.id || e?.participants.filter(p=>p.id === currentUser?.id).length !==0)
                            return <EventCal
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
                        {/* <div className='title'>TODAY</div>

                        <div className='title'>THIS WEEK</div>

                        <div className='title'>THIS MONTH</div> */}

                    </div>
                </div>
                <div className='recommended-top-container'>
                    <div className='recommended'>
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
