import React from 'react'
import '../../styles/home.css';
import Circle from '../Circle';

const HomeHeader = () => {
    return (
        <div className='header'>
            <div className='column-header'>
                <p>IN PROGRESS</p>
                <Circle/>
            </div>
            <div className='column-header'>
            <p>IN PROGRESS</p>
            <Circle/>
            </div>
            <div className='column-header'>
            <p>IN PROGRESS</p>
            <p>Saturday, 20 March
                <br></br>
                22:30
            </p>
            </div>
            
        </div>
    )
}

export default HomeHeader
