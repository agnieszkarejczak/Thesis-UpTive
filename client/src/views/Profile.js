import React from 'react'
import '../styles/index.css';
import '../styles/circles.css';
import '../styles/profile.css';

import Socials from '../components/Profile/Socials';
import TopActivities from '../components/TopActivities';
import Activity from '../components/Profile/Activity';
import Achievement from '../components/Profile/Achievement';
import EventsCal from '../components/Home/EventsCal';



const Profile = () => {
    return (
        <div className='content content-profile'>
            <div className='profile-column'>
                <img className='avatar-profile' src='basic.jpg' alt='Avatar'/>
                <Socials/>
                <label className='label-profile'>BIO</label>
                <div className='bio'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed justo elit. Vestibulum a ligula nec lacus iaculis varius. Etiam ullamcorper, magna sit amet vehicula luctus, dui nisl tincidunt neque, ut aliquet nunc lacus id odio. Mauris vel tortor eu elit cursus suscipit. Donec dignissim felis sit amet arcu congue, eu ullamcorper urna lobortis. Ut aliquam enim sapien, eget vulputate mauris tristique in. Donec iaculis nisl diam, vitae efficitur est fermentum semper. 
                </div>
                <label className='label-profile'>MY CURRENT EVENTS</label>
                <EventsCal/>
            </div>
            <div className='profile-column'>
            <label className='label-profile'>TOP ACTIVITIES</label>
                <TopActivities/>
            <label className='label-profile'>ACTIVITIES</label>
                <Activity/>
                <Activity/>
                <Activity/>
            <label className='label-profile'>ACHIEVEMENTS</label>
                <Achievement/>
                <Achievement/>
                <Achievement/>

            </div>
        </div>
    )
}

export default Profile
