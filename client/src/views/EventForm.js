import React, {useEffect, useState} from 'react';
import {useForm,} from "react-hook-form";
import {Api} from '../apiHandler/apiHandler';
import '../styles/index.css';
import '../styles/event-form.css';
import {BsPlusSquare} from 'react-icons/bs'
import { IconContext } from "react-icons";
import Swal from "sweetalert2";


const EventForm = () => {

    const {register, handleSubmit, formState: { errors } } = useForm({
        validateCriteriaMode: "all",
        mode: "onSubmit"
    });


    const [activities, setActivities] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [levels, setLevels] = useState([]);


        useEffect(()=>{


        Api.me().then(response =>{
            if(response.status === 200){
                setCurrentUser(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );

        Api.levels().then(response =>{
            if(response.status === 200){
                setLevels([...levels,response.data]);
            }
        })
        .catch(error =>
            console.log(error)
        );

        Api.activities().then(response =>{
            if(response.status === 200){
                setActivities([...activities,response.data]);
            }
        })
        .catch(error =>
            console.log(error)
        );


    },[]);


    const submitPost = async (formData) => {
        formData['email'] = currentUser?.email;
        Api.addEvent(formData)        
        .then(function(response){
            if(response.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Event added!',
                    showConfirmButton: true
                })
            }
        })
        .catch(error =>
            Swal.fire({
                icon: 'error',
                title: 'Ups! something went wrong',
                text:'There is another event assign by you in the same location, time and date.',
                showConfirmButton: true
            })
        );  

        
       
    };


    return (
        <div className='content content-profile' >
            <form className='form-add-event' onSubmit={handleSubmit(submitPost)}>
                <label>GENERAL</label>
                <section>
                    <select required {...register("activity", {required: true})} >
                        {activities[0]?.map(a=>{
                            return <option key={a.id} value={a.name}>{a.name}</option>
                        })}
                        
                    </select>
                    <select required {...register("level", {required: true})}>
                    {levels[0]?.map(l=>{
                            return <option key={l.id} value={l.name}>{l.name}</option>
                        })}
                    </select>
                </section>
                <label>LOCATION & TIME</label>
                <section>
                    <input required {...register("location", {required: true})} type='text'></input>
                    <input required {...register("date", {required: true})} type='date'></input>
                    <input required {...register("time", {required: true})} type='time'></input>
                </section>
                {/* <IconContext.Provider value={{ className:'plus-icon' }}>

                    <BsPlusSquare/>

                </IconContext.Provider> */}
                <label>OPTIONAL</label>
                <section>
                    <input type='number' min="1" placeholder='required number of participants' {...register("required", {required: false})}></input>
                </section>
                {/* <IconContext.Provider value={{ className:'plus-icon' }}>

                    <BsPlusSquare/>

                </IconContext.Provider> */}
                <label>MESSAGE</label>
                <div className= 'mess-button-container'>
                    <textarea {...register("message")} name="message" id="message" cols='55' rows='7' ></textarea>
                    
                </div>
                <button type="submit" className='btn-submit-add-event'>ADD EVENT</button>     
                
            </form>

        </div>
    )
}

export default EventForm
