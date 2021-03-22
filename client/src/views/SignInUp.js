import React from 'react'
import '../styles/sign-in-up.css';
import '../styles/index.css';
import {Link} from 'react-router-dom'

const SignInUp = () => {
    return (
        <div className='container-sign'>
            <div className='content-sign'>
                <div className='left-sign'>
                    <img className='logo-sign' src='logo1.png'></img>
                </div>
                <div className='right-sign'>
                    
                    <form className='form-sign'>
                    <div className='sign-up-in-chooser'>
                    <button className='btn-chooser'>SIGN UP</button>
                        <button className='btn-chooser'>SIGN IN</button>                        
                    </div>
                        <br></br>
                        <input type='text' placeholder='First Name*'></input>
                        <input type='text' placeholder='Last Name*'></input>
                        <input type='text' placeholder='Email*'></input>
                        <input type='text' placeholder='Password*'></input>
                        <input type='text' placeholder='Repeat Password*'></input>
                        <br></br>
                        <input type='checkbox'></input>
                        <br></br>
                        <Link to='/home'> 
                        <button className='btn-submit-sign'>SIGN UP</button>
                        </Link>
                        

                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default SignInUp
