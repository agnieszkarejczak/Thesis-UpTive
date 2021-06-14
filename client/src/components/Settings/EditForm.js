import React, {useEffect, useState} from 'react'
import {Api} from '../../apiHandler/apiHandler';
import Activity from '../Profile/Activity';
import Swal from "sweetalert2";

const EditForm = () => {

    const [activity,setActivity] = useState();

    const [activities, setActivities] = useState();
    const [change, setChange] = useState(1);



    useEffect(()=>{

        Api.activities().then(response =>{
            if(response.status === 200){
                setActivities(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );


    },[change]);

    function AddActivity(){

        Api.addActivity({name:activity}).then(response =>{
            if(response.status === 200){
                setChange(oldChange => oldChange+1);
                Swal.fire({
                    icon: 'success',
                    title: response.data.name+' has been added!',
                    showConfirmButton: true
                })
            }
        })
        .catch(error =>
            Swal.fire({
                icon: 'error',
                title: 'Ups! something went wrong',
                text: 'This activity is already in database',
                showConfirmButton: true
            })
        );
    }

    return (
        <div>
            <h1>Edit Event Form</h1>
            <br></br>
            <label className="label-settings">Add new Activity</label>
            <section className="edit-section">
                <input type="text" onChange={e=>setActivity(e.target.value)}/>
                <input type="submit" onClick={AddActivity}/>
            </section>
            <label className="label-settings">List of current Activities</label>
            <section className="edit-section">
                <ul>
                    {activities?.map(a =>{
                        return <li><Activity                   
                             key={a.id}
                            id={a.id}
                            activity={a.name}/>
                            </li>
                    })}
                    
                </ul>
            </section>

        </div>
    )
}

export default EditForm
