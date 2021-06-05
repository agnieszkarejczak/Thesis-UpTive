import React, {useEffect, useState} from 'react';
import {useForm,} from "react-hook-form";
import {Api} from '../apiHandler/apiHandler';
import '../styles/index.css';
import '../styles/event-form.css';
import {BsPlusSquare} from 'react-icons/bs'
import { IconContext } from "react-icons";
import axios from "axios";

const EventForm = () => {

    const {register, handleSubmit, formState: { errors } } = useForm({
        validateCriteriaMode: "all",
        mode: "onSubmit"
    });


    const [activities, setActivities] = useState([]);
    const [levels, setLevels] = useState([]);

        useEffect(()=>{

        
        Api.levels().then(response =>{
            if(response.status === 200){
                setLevels([...levels,response.data]);
            }
        })
        .catch(error =>
            alert(error)
        );

        Api.activities().then(response =>{
            if(response.status === 200){
                setActivities([...activities,response.data]);
            }
        })
        .catch(error =>
            alert(error)
        );


    },[]);


    const submitPost = async (formData) => {


        Api.addEvent(formData).then(response =>{
            alert(response);
            if(response.status === 200){
                alert("YAS");
            }
        })
        .catch(error =>
            alert(error)
        );  

        
        // axios.post(`http://localhost:8080/api/events/add`, formData,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})
        // .then(function(response){
        //     alert(response);
        // })
        // .catch(function(error){
        //     alert(error);
        // });
        
    };


    return (
        <div className='content content-profile' >
            <form className='form-add-event' onSubmit={handleSubmit(submitPost)}>
                <input type="hidden" {...register("email", {required: true})} value="email1@gmail.com"></input>
                <label>GENERAL</label>
                <section>
                    <select {...register("activity", {required: true})} >
                        {activities[0]?.map(a=>{
                            return <option key={a.id} value={a.name}>{a.name}</option>
                        })}
                        
                    </select>
                    <select {...register("level", {required: true})}>
                    {levels[0]?.map(l=>{
                            return <option key={l.id} value={l.name}>{l.name}</option>
                        })}
                    </select>
                </section>
                <label>LOCATION & TIME</label>
                <section>
                    <input {...register("location", {required: true})} type='text'></input>
                    <input {...register("date", {required: true})} type='date'></input>
                    <input {...register("time", {required: true})} type='time'></input>
                </section>
                <IconContext.Provider value={{ className:'plus-icon' }}>

                    <BsPlusSquare/>

                </IconContext.Provider>
                <label>OPTIONAL</label>
                <section>
                    <input type='number' placeholder='required number of participants'></input>
                </section>
                <IconContext.Provider value={{ className:'plus-icon' }}>

                    <BsPlusSquare/>

                </IconContext.Provider>
                <label>MESSAGE</label>
                <div className= 'mess-button-container'>
                    <textarea {...register("message")} name="message" id="message" cols='50' rows='7' ></textarea>
                    
                </div>
                <button type="submit" className='btn-submit-add-event'>ADD EVENT</button>     
                
            </form>

        </div>
    )
}

export default EventForm
