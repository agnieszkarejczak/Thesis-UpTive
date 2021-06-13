import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/nav-bar.css';
import {Api} from '../apiHandler/apiHandler';

const LeftBar = () => {

    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{

        Api.me().then(response =>{
            if(response.status === 200){
                setCurrentUser(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );
    },[]);
    return (
        <div className='nav-bar'>
            <Link to='/'><img className="logo" src="logo1.png"></img></Link>
            
            <ul className='bar-ul'>
                <li>< Link to='/' className='bar-link'>
                <i class="fas fa-home"></i>
                    </Link>
                </li>
                {/* <li>
                    < Link to='/Friends' className='bar-link'>
                        <i class="fas fa-user-friends"></i>
                    </Link>
                </li> */}
                <li>< Link to='/SearchEvents' className='bar-link'>
                        <i class="fas fa-search"></i>
                    </Link>
                </li>
                <li>
                    < Link to='/EventForm' className='bar-link'>
                        <i class="fas fa-plus"></i>
                    </Link>
                </li>
                <li>
                    < Link to='/SignInUP' className='bar-link' onClick={Api.invalidateSession}>
                        <i class="fas fa-door-open"></i>
                    </Link>
                </li>

                <li>
                    < Link to='/Profile' className='bar-link'>
                        <i class="far fa-user-circle"></i>
                    </Link>   
                </li>
                {currentUser?.role?.name === "admin" &&
                    <li>
                    < Link to='/Settings' className='bar-link'>
                    <i class="fas fa-cog"></i>
                    </Link>
                    </li>
                }
                              
            </ul>
                    
            
        </div>

    )
}

export default LeftBar
