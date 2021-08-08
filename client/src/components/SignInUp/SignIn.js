import React, {useEffect,useState, useRef} from 'react';
import {useForm,} from "react-hook-form";
import '../../styles/sign-in-up.css';
import '../../styles/index.css';
import axios from "axios";
import {Link} from 'react-router-dom'
import {useHistory} from "react-router";
import {Redirect} from "react-router-dom";
import {Api} from '../../apiHandler/apiHandler';
import Swal from "sweetalert2";


const SignUp = () => {

    const {register, handleSubmit, formState: { errors } } = useForm({
        validateCriteriaMode: "all",
        mode: "onSubmit"
    });
    const [error,setError] =useState();
    let history = useHistory();

    

    const submitPost = async (formData) => {
       
        axios.post(`http://localhost:8080/api/users/login`, formData)
        .then(function(response){
            console.log(response);
            if(response.status === 200){
                localStorage.setItem('token',response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Logged In!',
                    showConfirmButton: true,
                    confirmButtonText: '<a href="/home">OK</a>'
                })
                    
            }
        })
        .catch(function(error){
            setError("invalid Credentials");
        });
        


    };


    return (
        
        <form className='form-sign' onSubmit = {handleSubmit(submitPost)}>
            <h6> {error}</h6>
                   
        <input {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} type='text' placeholder='Email*'></input>
        {errors.email && errors.email.type === "required"  && <h6>this field is required</h6>}
        {errors.email && errors.email.type === "pattern"  && <h6>Wrong email</h6>}

        <br></br>

        <input {...register("password", {required: true})} type='password' placeholder='Password*'></input>
        {errors.password && errors.password.type === "required"  && <h6>this field is required</h6>}

        
            <button href="/home"  type="submit" className='btn-submit-sign'>SIGN IN</button>
        
        


    </form>
    )
}

export default SignUp
