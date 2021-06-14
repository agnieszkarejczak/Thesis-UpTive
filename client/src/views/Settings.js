import '../styles/settings.css';
import React, {useEffect, useState} from 'react'
import EditForm from '../components/Settings/EditForm';
import AddAdmins from '../components/Settings/AddAdmins';

const Settings = () => {

    const [setting,setSetting] = useState(1);

    return (
        <div className="settings-content">
            <button className="settings-btn" onClick={(e=>{setSetting(1)})}>Edit event form</button>
            <button className="settings-btn"onClick={(e=>{setSetting(2)})}>Add admins</button>
            {setting===1 ?
            <EditForm/>
            :
            <AddAdmins/>    
        }
            
 
            
        </div>
    )
}

export default Settings
