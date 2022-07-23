import React, {useState, useEffect, useContext} from 'react'


// Context
import { ContactContext } from '../../context/ContactContext'
import { ActiveChats } from '../../context/ActiveChats'

// Child components
import { EditProfile } from './EditProfile';
import { PersonalInfo } from './Personal_Info';
import { UserIntroduction } from './UserIntroduction';


export const Profile = ({user:loggedUser}) => {
    const [loading, setLoading] = useState(true);
    const [showEditProfile, setShowEditProfile] = useState(false);

    const {userContacts} = useContext(ContactContext);
    const {chats} = useContext(ActiveChats);

      // ^^^^^^^
      const showOrHide = () => {
        setShowEditProfile(prev=>!prev);
      }


    const data = [{
      value:userContacts.length,
      name:'Contacts'
    },
    {
      value:chats.length,
      name:'Active chats'
    }];

    useEffect(()=>{
          if(chats!==undefined && userContacts!==undefined) setLoading(false);
    }, [chats, userContacts]);

   

  return (
   <>
      {loading ? <p>Loading</p> 
      
               :

      <div className='profile_page' style={forProfilePage}>
      <h1 className='page_title' style={forPageTitle}>Profile</h1>

      <PersonalInfo loggedUser={loggedUser} />

      <div className='user_data_informations' style={forUserDataInfo}>
        {data && data.map(item => <UserIntroduction key={item.name} name={item.name} value={item.value} />)}
      </div>

      <button className='btn edit_btn' style={forButton} onClick={showOrHide}>
        Edit profile
      </button>

        {showEditProfile && <EditProfile loggedUser={loggedUser} />}
      </div>

    }
   </>
  )
}

const forProfilePage = {
  minHeight:'34em',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center'
}


const forPageTitle = {
  color:'#3570EC',
  fontWeight: '400',
  fontSize: '28px',
  lineHeight: '150%',
  textAlign:'center',
  marginBottom:'1.5em'
}




const forUserDataInfo = {
  display:'flex',
  justifyContent:'space-evenly',
  alignItems:'center',
  width:'100%'
}


const forButton = {
  background: 'linear-gradient(88.78deg, rgba(218, 90, 250, 0.6) -34.1%, rgba(53, 112, 236, 0.6) 113.16%)',
   borderRadius: '5px',
   padding:'1em 2em',
   color:'#fff',
  fontSize:'16px',
  marginTop:'4.5em'
}