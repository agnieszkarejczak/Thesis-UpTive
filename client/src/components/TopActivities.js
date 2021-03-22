import React from 'react'
import '../styles/circles.css';
import Circle from './Circle';

const TopActivities = ({numberOfCircles, color, borderColor, number}) => {
    return (
        <div className='top-activ'>
            <Circle borderColor={borderColor} color={color} number={number} />
            <Circle borderColor={borderColor} color={color} number={number} />
            <Circle borderColor={borderColor} color={color} number={number} />

        </div>
    )
}

export default TopActivities
