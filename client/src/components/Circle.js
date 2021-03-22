import React from 'react'
import '../styles/circles.css';

const Circle = ({borderColor, color, number, size}) => {
    return (
        <div className='circle' style={{borderColor: borderColor, color: color }}>
            {number}
        </div>
    )
}

export default Circle
