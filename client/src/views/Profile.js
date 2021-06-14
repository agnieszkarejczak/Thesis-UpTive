import React, {useState, useEffect} from 'react'
import {Api} from '../apiHandler/apiHandler';
import '../styles/index.css';
import '../styles/circles.css';
import '../styles/profile.css';
import EventSearch from '../components/SearchEvents/EventSearch'
import Socials from '../components/Profile/Socials';
import TopActivities from '../components/TopActivities';
import Activity from '../components/Profile/Activity';
import Achievement from '../components/Profile/Achievement';
import EventsCal from '../components/Home/EventsCal';
import {BsPlusSquare} from 'react-icons/bs'
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import axios from 'axios';
import {useParams} from "react-router";


const Profile = () => {

    const [currentUser, setCurrentUser] = useState({});
    const [profileUser,setProfileUser] = useState({})
    const [isSame, setIsSame] = useState(false);
    const [activities, setActivities] = useState([]);
    const [changes,setChanges]=useState(0);
    const [events, setEvents] = useState({
        events: []
    });
    const { id} = useParams();
    



    function prepareActivitiesSelect(){
        const optionsActivities = {}
        const userActivitiesNames=currentUser?.userDetails?.userActivities.map(a =>a.name);
        activities?.filter(a => !userActivitiesNames.includes(a.name)).map( a => optionsActivities[a.id] = a.name);
        return optionsActivities;
    }

    useEffect(()=>{

        Api.me().then(response =>{
            if(response.status === 200){
                setCurrentUser(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );
        if(currentUser?.id==id){

            setIsSame(true);
        }
        Api.getUser(id).then(response =>{
            if(response.status === 200){
                setProfileUser(response.data);
                console.log(profileUser);
            }
        })
        .catch(error =>
            console.log(error)
        );

        Api.activities().then(response =>{
            if(response.status === 200){
                setActivities(response.data);
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

    },[changes, currentUser?.id,id]);

    function addActivity(){
        Swal.fire({
            title: 'Choose activity that you want to add:',
            input: 'select',
            inputOptions: prepareActivitiesSelect(),
            showCancelButton: true,
            confirmButtonText: 'Add activity',
            showLoaderOnConfirm: true,
            preConfirm: (res) =>{
                console.log(res);

                return Api.addUserActivity({
                    "userId":currentUser?.id,
                    "activityId":res
                })
                .then(response => {
                    if(response.status===200)
                        return response;
                })
                .catch(error =>{
                    Swal.showValidationMessage("Error")
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if(result.isConfirmed){
                setChanges(oldChanges => oldChanges+1);
                console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Activity added succesfully!',
                    
                    showConfirmButton: true
                })
            }
          })
       
    }

    return (
        <div className='content content-profile'>
            {/* <div className='profile-column'> */}
                <img className='avatar-profile' src={"/avatars/"+profileUser?.userDetails?.avatar} alt='Avatar'/>
                <br></br>
                <p>{profileUser?.userDetails?.name+' '+profileUser?.userDetails?.surname}</p>
                <Socials/>
                <label className='label-profile'>BIO</label>
                {profileUser?.userDetails?.bio ?
                    <div className='bio'>
                    {profileUser?.userDetails?.bio}
                    </div>
                    :
                    <h6>No bio</h6>
                }
                <label className='label-profile'>ACTIVITIES </label>
            {profileUser?.userDetails?.userActivities.length ?
            profileUser?.userDetails?.userActivities.map(a =>{
                return <Activity
                    key={a.id}
                    id={a.id}
                    activity={a.name}
                />
            })
            :
            <p>No activities added yet</p>
            }
            {isSame && <BsPlusSquare className="plus-icon" onClick={addActivity}/>}
            
                
                <label className='label-profile'>MY CURRENT EVENTS</label>
                <div className="profile-events-container">
                {events?.events.filter(e => e.assignedBy.id === profileUser?.id).map(e => { 
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
                
                
            {/* </div> */}
            {/* <div className='profile-column'> */}
            {/* <label className='label-profile'>TOP ACTIVITIES</label>
                <TopActivities/> */}
            {/*  */}

            {/* <label className='label-profile'>ACHIEVEMENTS</label>
                <Achievement/>
                <Achievement/>
                <Achievement/> */}

             {/* </div> */}
        </div> 
    )
}

export default Profile
