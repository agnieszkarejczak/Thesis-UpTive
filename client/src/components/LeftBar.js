import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/left-bar.css';

const LeftBar = () => {
    return (
        <div className='left-bar'>
            <Link to='/'><img className="logo" src="logo1.png"></img></Link>
            
            <ul className='bar-ul'>
                <li>< Link to='/' className='bar-link'>
                <i class="fas fa-home"></i>
                    </Link>
                </li>
                <li>
                    < Link to='/Friends' className='bar-link'>
                        <i class="fas fa-user-friends"></i>
                    </Link>
                </li>
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
                    < Link to='/SignInUP' className='bar-link'>
                        <i class="fas fa-door-open"></i>
                    </Link>
                </li>
                <li>
                    < Link to='/Settings' className='bar-link'>
                    <i class="fas fa-cog"></i>
                    </Link>
                </li>
                <li>
                    < Link to='/Profile' className='bar-link'>
                        <i class="far fa-user-circle"></i>
                    </Link>   
                </li>              
            </ul>
                    
            
        </div>

    )
}

export default LeftBar
