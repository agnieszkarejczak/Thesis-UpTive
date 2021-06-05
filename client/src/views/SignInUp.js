import React, {useState} from 'react';
import {useForm,} from "react-hook-form";
import '../styles/sign-in-up.css';
import '../styles/index.css';
import {Link} from 'react-router-dom'
import SignUp from '../components/SignInUp/SignUp'
import SignIn from '../components/SignInUp/SignIn'

const SignInUp = () => {

    const [chooser, setChooser] = useState(0);

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
