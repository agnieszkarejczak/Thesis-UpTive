import React, {useState} from 'react';
import {useForm,} from "react-hook-form";
import '../styles/sign-in-up.css';
import '../styles/index.css';
import axios from "axios";
import {Link} from 'react-router-dom'
import SignUp from '../components/SignInUp/SignUp'
import SignIn from '../components/SignInUp/SignIn'

const SignInUp = () => {

    const [chooser, setChooser] = useState(0);

    const {register, handleSubmit,watch, formState: { errors } } = useForm({
        validateCriteriaMode: "all",
        mode: "onSubmit"
    });

    const passwordWatch = watch("password");

    console.log(errors, "Errors");


    const submitPost = async (formData) => {

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
        <div className='container-sign'>
            <div className='content-sign'>
                <div className='left-sign'>
                    <img className='logo-sign' src='logo1.png' alt='logo'></img>
                </div>
                <div className='right-sign'>
                <div className='sign-up-in-chooser'>
                    <button className='btn-chooser' onClick={()=>setChooser(1)}>SIGN UP</button>
                        <button className='btn-chooser' onClick={()=>setChooser(0)}>SIGN IN</button>                        
                    </div>
                    
                    {chooser === 0 ? <SignIn/> : <SignUp/>}
                </div>
            </div>
            
        </div>
    )
}

export default SignInUp
