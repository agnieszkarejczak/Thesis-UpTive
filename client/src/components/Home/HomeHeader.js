import React from 'react'
import '../../styles/home.css';
import Circle from '../Circle';

const HomeHeader = (props) => {
    return (
        <div className='header'>
            <div className='column-header'>
                <p>IN PROGRESS</p>
                <Circle borderColor= '#907bdb' color='grey' number={2}/>
            </div>
            <div className='column-header'>
            <p>CALLENDAR</p>
            <Circle borderColor= '#907bdb' color='grey' number={props.callendar}/>
            </div>
            <div className='column-header'>
            <p>RECOMENDED</p>
            <p>Saturday, 20 March
                <br></br>
                22:30
            </p>
            </div>
            
        </div>
    )
}

export default HomeHeader
