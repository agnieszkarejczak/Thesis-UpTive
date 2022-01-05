import React, {useEffect, useState} from 'react';
import {useForm,} from "react-hook-form";
import {Api} from '../apiHandler/apiHandler';
import '../styles/index.css';
import '../styles/event-form.css';
import Swal from "sweetalert2";
import Autocomplete from "react-google-autocomplete";
import {API_KEY} from '../const/const.js'


const EventForm = () => {

    const {register, handleSubmit,watch,getValues, formState: { errors } } = useForm({
        validateCriteriaMode: "all",
        mode: "onSubmit"
    });

    const startDateWatch = watch("startDate");
    const startTimeWatch = watch("startTime");
    const endDateWatch = watch("endDate");


    const [activities, setActivities] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [levels, setLevels] = useState([]);
    const [location, setLocation] = useState();


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
        formData['location'] = location
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
                <label>ACTIVITY TYPE & IMPACT</label>
                <section>
                    <select required {...register("activity", {required: true})}>
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
                <label>LOCATION</label>
                <Autocomplete 
                  apiKey={API_KEY}
                  onPlaceSelected={(place) => {
                      setLocation(place.formatted_address)
                      console.log(place)
                  }}
                  options={{
                    types: ["(regions)"],
                    componentRestrictions: { country: "pl" },
                  }}
                />
                <label>START TIME</label>
                <section>
                    <input required {...register("startDate", {required: true})} type='date'></input>
                    <input required {...register("startTime", {required: true})} type='time'></input>
                </section>
                <label>END TIME</label>
                <section>
                    <input  required {...register("endDate", {required: true,validate:value=>value?value>=startDateWatch:true})} type='date'></input>
                    <input  required {...register("endTime", {required: true,validate:value=>{
                    let sDateTime = new Date(startDateWatch+"T"+startTimeWatch+":00")
                    let eDateTime = new Date(endDateWatch+"T"+value+":00")
                    console.log(startDateWatch)
                    return value?sDateTime.getTime()<=eDateTime.getTime():true
                }})} type='time'></input>
                                {errors.endTime && errors.endTime.type === "validate"  && <h6>Wrong Time! Event cannot start later then it ends. </h6>}
                {errors.endDate && errors.endDate.type === "validate"  && <h6>Wrong Date! Start Date cannot be later then End Date.</h6>}
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
