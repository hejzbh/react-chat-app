import React, {useContext} from 'react'
//contexts
import { ContactContext } from '../../context/ContactContext'

// Components
import { FavoriteContacts } from './FavoriteContacts';
import { NoContactsFound } from './NoContactsFound';
import { User } from '../UsersPreview'


export const  Contacts = () => {
  const {userContacts} = useContext(ContactContext);
  
  return (
    <div className='contacts_page'
    style={forContactPage}>

        {/** Component for favorite contacts (Those with whom (loggedUser) have chat */}
        <FavoriteContacts />

        {/** In case: there is no contacts, show message for it */}
        {userContacts.length<1 && <NoContactsFound />}

        
        {userContacts.length>=1 && <p style={forP}>Your contacts/friends:</p>}

        {/** Display contacts */}
        {userContacts.map(user=>(
            <User user={user}  style={forContactUser}  />
        ))}
    </div>
  )
}



// STYLE - CSS
const forContactPage = {
  minHeight:'35em'
}

const forP = {
    fontSize:'15px',
    color:'#3570EC',
    marginBottom:'10px'
}

const forContactUser = {
  display:'flex'
}

