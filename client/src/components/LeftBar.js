import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/left-bar.css';

const LeftBar = () => {
    return (
        <div className='left-bar'>
            <ul>
            <li>< Link to='/'>Home</Link></li>
            <li>< Link to='/lirofile'>lirofile</Link></li>
            <li>< Link to='/SearchEvents'>SearchEventss</Link></li>
            <li>< Link to='/EventForm'>Add Event</Link></li>
            <li>< Link to='/SignInUli'>Log out</Link></li>
            </ul>
            
            
        </div>

    )
}

export default LeftBar
