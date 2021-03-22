import React from 'react'
import '../styles/index.css';
import '../styles/home.css';
import Events from '../components/Home/Events';
import EventsCal from '../components/Home/EventsCal';
import HomeHeader from '../components/Home/HomeHeader';
import TopActivities from '../components/TopActivities';
/*TODO Popraw routing (signInUp wyświetl bez left bar ale żeby można było przejść stamtąd do home) */
const Home = () => {
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
                        <Events />
                    </div>
                    <div className='top-activ'>
                        <TopActivities/>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Home
