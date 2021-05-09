import React from 'react'
import '../styles/index.css';
import '../styles/event-form.css';
import {BsPlusSquare} from 'react-icons/bs'
import { IconContext } from "react-icons";

const EventForm = () => {
    return (
        <div className='content content-profile'>
            <div className='form-add-event'>
                <label>GENERAL</label>
                <section>
                    <select></select>
                    <select></select>
                </section>
                <label>LOCATION & TIME</label>
                <section>
                    <select></select>
                    <input type='data'></input>
                    <input type='time'></input>
                </section>
                <IconContext.Provider value={{ className:'plus-icon' }}>

                    <BsPlusSquare/>

                </IconContext.Provider>
                <label>OPTIONAL</label>
                <section>
                    <select></select>
                    <select></select>
                </section>
                <IconContext.Provider value={{ className:'plus-icon' }}>

                    <BsPlusSquare/>

                </IconContext.Provider>
                <label>MESSAGE</label>
                <div className= 'mess-button-container'>
                    <textarea name="about" id="about" cols='50' rows='7' ></textarea>
                    <button className='btn-submit-add-event'>ADD EVENT</button>
                </div>
                
                
              
                
            </div>
        </div>
    )
}

export default EventForm
