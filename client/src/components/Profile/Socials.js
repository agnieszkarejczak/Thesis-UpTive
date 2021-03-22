import React from 'react'
import '../../styles/profile.css';
import {FiFacebook, FiInstagram} from 'react-icons/fi'
import {RiSnapchatLine, RiTwitterLine} from 'react-icons/ri'
const Socials = () => {
    return (
        <div className='socials-profile'>
            <FiFacebook/>
            <FiInstagram/>
            <RiSnapchatLine/>
            <RiTwitterLine/>

        </div>
    )
}

export default Socials
