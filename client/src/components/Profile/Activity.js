import React from 'react'
import {FaVolleyballBall, FaRegStar} from 'react-icons/fa'
import '../../styles/profile.css';

const Activity = () => {
    return (
        <div className='activity'>
            <FaVolleyballBall/>
            <label>Volleyball</label>
            {/* Potwierdzenie umiejetnosci przez innych? */}
            <FaRegStar />
            <p>12</p>
        </div>
    )
}

export default Activity
