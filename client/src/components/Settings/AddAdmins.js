import React, {useState, useEffect} from 'react'
import {Api} from '../../apiHandler/apiHandler';
import '../../styles/search-events.css';
import {Link} from 'react-router-dom'
const AddAdmins = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{

        Api.users().then(response =>{
            if(response.status === 200){
                setUsers(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );     
    },[]);
    return (
        <div className="container-users">
            {console.log(users)}
            {users?.map(e=>{
                return <div className='avatar-container'>
                    <Link to={`/Profile/${e.id}`}>
                            <img title={e.userDetails.name+" "+e.userDetails.surname}  
                            className='avatar-search' key={e.id} src={"/avatars/"+e.userDetails.avatar} alt='par'/>
                        </Link>  
                        <p>{e.userDetails.name+" "+e.userDetails.surname}</p>
                </div>
                
            })}
            
        </div>
    )
}

export default AddAdmins
