import React, {useState, useEffect} from 'react'
import {Api} from '../apiHandler/apiHandler';
import '../styles/index.css';
import '../styles/circles.css';
import '../styles/profile.css';

import Socials from '../components/Profile/Socials';
import TopActivities from '../components/TopActivities';
import Activity from '../components/Profile/Activity';
import Achievement from '../components/Profile/Achievement';
import EventsCal from '../components/Home/EventsCal';
import {BsPlusSquare} from 'react-icons/bs'
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import axios from 'axios';



const Profile = () => {

    const [currentUser, setCurrentUser] = useState({
        userId:'',
        activityId:''
    });
    const [activities, setActivities] = useState([]);
    const [changes,setChanges]=useState(0);



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
            alert(error)
        );

        Api.activities().then(response =>{
            if(response.status === 200){
                setActivities(response.data);
            }
        })
        .catch(error =>
            alert(error)
        );


    },[changes]);

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
                    text:'You added ',
                    showConfirmButton: true
                })
            }
          })
       
    }

    return (
        <div className='content content-profile'>
            <div className='profile-column'>
                <img className='avatar-profile' src={"avatars/"+currentUser?.userDetails?.avatar} alt='Avatar'/>
                <br></br>
                <p>{currentUser?.userDetails?.name+' '+currentUser?.userDetails?.surname}</p>
                <Socials/>
                <label className='label-profile'>BIO</label>
                {currentUser?.userDetails?.bio ?
                    <div className='bio'>
                    {currentUser?.userDetails?.bio}
                    </div>
                    :
                    <h6>No bio</h6>
                }
                
                <label className='label-profile'>MY CURRENT EVENTS</label>
                
            </div>
            <div className='profile-column'>
            <label className='label-profile'>TOP ACTIVITIES</label>
                <TopActivities/>
            <label className='label-profile'>ACTIVITIES 
              


                    <BsPlusSquare onClick={addActivity}/>


            </label>
            {currentUser?.userDetails?.userActivities.length ?
            currentUser?.userDetails?.userActivities.map(a =>{
                return <Activity
                    key={a.id}
                    id={a.id}
                    activity={a.name}
                />
            })
            :
            <p>No activities added yet</p>
            }

            <label className='label-profile'>ACHIEVEMENTS</label>
                <Achievement/>
                <Achievement/>
                <Achievement/>

            </div>
        </div>
    )
}

export default Profile
