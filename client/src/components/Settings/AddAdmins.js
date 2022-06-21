import React, {useState, useEffect} from 'react'
import {Api} from '../../apiHandler/apiHandler';
import '../../styles/search-events.css';
import {Link} from 'react-router-dom'
import {BsPlusSquare} from 'react-icons/bs';
import Swal from "sweetalert2";
const AddAdmins = () => {
    const [users, setUsers] = useState([]);
    const [changes,setChanges]=useState(0);
    useEffect(()=>{

        Api.users().then(response =>{
            if(response.status === 200){
                setUsers(response.data);
            }
        })
        .catch(error =>
            console.log(error)
        );     
    },[changes]);
    function addAdmin(userId){
        Api.addAdmin({"userId":userId}).then(response =>{
            if(response.status === 200){
                setChanges(oldChange => oldChange+1);
                Swal.fire({
                    icon: 'success',
                    title: 'New admin added',
                    showConfirmButton: true
                })
            }
        })
        .catch(error =>
            Swal.fire({
                icon: 'error',
                title: 'Ups! something went wrong',
                showConfirmButton: true
            })
        );
    }
    return (

             <div className="container-users">
            {console.log(users)}
            {users?.sort(function(a, b){
                    if(a.role?.name < b.role?.name) { return -1; }
                    if(a.role?.name > b.role?.name) { return 1; }
                    return 0;
                }
            )
            .map(e=>{
                return <div className='avatar-container'>
                    <Link to={`/Profile/${e.id}`}>
                            <img title={e.userDetails.name+" "+e.userDetails.surname}  
                            className='avatar-search' key={e.id} src={"/avatars/"+e.userDetails.avatar} alt='par'/>
                        </Link>  
                        <p>{e.userDetails.name+" "+e.userDetails.surname}</p>
                        {e?.role?.name==="user" && <BsPlusSquare className="plus-icon"  onClick={()=>addAdmin(e?.id)}/>}
                </div>
                
            })}
            
        
        </div>
       
    )
}

export default AddAdmins
