import React from 'react'
import '../../styles/home.css';

const HomeHeader = (props) => {
    return (
        <div className='header'>
            <div className='column-header'>
                <p>IN PROGRESS</p>

            </div>
            <div className='column-header'>
            <p>CALLENDAR</p>

            </div>
            <div className='column-header'>
            <p>RECOMENDED</p>

            </div>
            
        </div>
    )
}

export default HomeHeader
