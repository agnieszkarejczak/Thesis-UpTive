import React, {useEffect} from 'react'
import axios from "axios";
import '../styles/index.css';
import '../styles/home.css';
import Events from '../components/Home/Events';
import EventsCal from '../components/Home/EventsCal';
import EventSearch from '../components/SearchEvents/EventSearch';
import HomeHeader from '../components/Home/HomeHeader';
import TopActivities from '../components/TopActivities';
/*TODO Popraw routing (signInUp wyświetl bez left bar ale żeby można było przejść stamtąd do home) */
const Home = () => {

    useEffect(()=>{

        const config = {
            withCredentials:true,
            crossdomain : true,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        axios.get('http://localhost:8080/api/users',config).then(
            function(response){
                console.log(response);
                if(response.status === 200){
                    alert("Logged in!");
                }
        })
        .catch(
            function(error){
                alert(error);
            }
        );
    });

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
                    <EventsCal />
                </div>
                <div className='recommended-top-container'>
                    <div className='recommended'>
                        <EventSearch/>
                        <EventSearch/>
                        <EventSearch/>
                        <EventSearch/>
                        <EventSearch/>
                        <EventSearch/>
                        <EventSearch/>
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
