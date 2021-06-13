import React from 'react'
import '../../styles/home.css';
import Circle from '../Circle';

const HomeHeader = (props) => {
    return (
        <div className='header'>
            <div className='column-header'>
                <p>IN PROGRESS</p>
                <Circle borderColor= '#907bdb' color='grey' />
            </div>
            <div className='column-header'>
            <p>CALLENDAR</p>
            <Circle borderColor= '#907bdb' color='grey' number={props.callendar}/>
            </div>
            <div className='column-header'>
            <p>RECOMENDED</p>

            </div>
            
        </div>
    )
}

export default HomeHeader
