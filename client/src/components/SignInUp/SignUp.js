import React, {useState, useRef} from 'react';
import {useForm,} from "react-hook-form";
import '../../styles/sign-in-up.css';
import '../../styles/index.css';
import axios from "axios";
import {Link} from 'react-router-dom'

const SignUp = () => {

    const {register, handleSubmit,watch, formState: { errors } } = useForm({
        validateCriteriaMode: "all",
        mode: "onSubmit"
    });

    const passwordWatch = watch("password");

    console.log(errors, "Errors");


    // const handleValidation = 

    const submitPost = async (formData) => {

        // alert(formData);
        
        delete formData[`acceptRequlations`];
        delete formData[`repeatPassword`];

        axios.post(`http://localhost:8080/api/users/add`, formData)
        .then(function(response){
            alert(response);
        })
        .catch(function(error){
            alert(error);
        });
        


    };

    return (
        <form className='form-sign' onSubmit = {handleSubmit(submitPost)}>
                   
        <br></br>
        <input {...register("name", {required: true, pattern:/^[A-Za-z]+$/i})} type='text' placeholder='First Name*'></input>
        {errors.name && errors.name.type === "pattern"  && <h6>Should contain letters</h6>}
        {errors.name && errors.name.type === "required"  && <h6>this field is required</h6>}

        <input type='text' placeholder='Surname*' {...register("surname",{required: true, pattern:/^[A-Za-z]+$/i })} />
        {errors.surname && errors.surname.type === "pattern"  && <h6>Should contain letters</h6>}
        {errors.surname && errors.surname.type === "required"  && <h6>this field is required</h6>}

        <input {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} type='text' placeholder='Email*'></input>
        {errors.email && errors.email.type === "required"  && <h6>this field is required</h6>}
        {errors.email && errors.email.type === "pattern"  && <h6>Wrong email</h6>}

        <input {...register("password", {required: true, minLenght: 8, pattern:/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))/ })} type='password' placeholder='Password*'></input>
        {errors.password && errors.password.type === "minLenght"  && <h6>password min lenght is 8</h6>}
        {errors.password && errors.password.type === "pattern"  && <h6>password must contain at least one lowercase and one uppercase letter and one number</h6>}
        {errors.password && errors.password.type === "required"  && <h6>this field is required</h6>}

        <input {...register("repeatPassword", {required: true, validate: value => value === passwordWatch})}  type='password' placeholder='Repeat Password*'/>
        {errors.repeatPassword && errors.repeatPassword.type === "validate"  && <h6>passwords do not much!</h6>}
        {errors.repeatPassword && errors.repeatPassword.type === "required"  && <h6>this field is required</h6>}
        
        <br></br>
        <input {...register("acceptRequlations", {required: true})} type='checkbox'></input>
        {errors.acceptRequlations && errors.acceptRequlations.type === "required"  && <h6>You must accept regulations</h6>}
        
        <br></br>
        {/* <Link to='/home'>  */}
        {/* <input type="submit" className='btn-submit-sign'/> */}
        <button  type="submit" className='btn-submit-sign'>SIGN UP</button>
        {/* </Link> */}
        

    </form>
    )
}

export default SignUp
