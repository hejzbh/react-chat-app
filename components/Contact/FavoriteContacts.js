import React, {useState, useEffect, useContext} from 'react'

// Images
import profilePhoto from '../../assets/images/profilePhoto.png'

// Component
import { User } from '../UsersPreview';

// Context
import { ActiveChats } from '../../context/ActiveChats';
import { userContext } from '../../context/UserContext';



import { Fade } from 'react-awesome-reveal';

export const FavoriteContacts = () => {
        const [favoritePersons, setFavoritePersons] = useState([]);

        const {user: loggedUser} = useContext(userContext);
        const {chats} = useContext(ActiveChats);
        
       

        useEffect(()=>{
                if(chats===undefined || loggedUser===undefined) return;

                filterUsersFromChats();
        }, [chats, loggedUser])

        

       const filterUsersFromChats = () => {
          
           const users = chats.flatMap(chat => [chat.first_user, chat.second_user])
           .filter(user=>user.id!==loggedUser.id);

    
          setFavoritePersons(users);
           
       }




  return (
    <>
       {favoritePersons.length>0 &&
        <div
         className='favorite_persons_div container'
          style={forFavPersons}>
        <p style={forP}>Persons from your chat</p>

        <ul className='list_of_fav_persons' style={forList}>
             {favoritePersons.map(person => (
                    
            <Fade>
            <div className='favorite_person' style={forFavPersonCont}>
               <User user={person} displayButton={false} style={forFavPerson} />
            </div>
            </Fade>

            ))}
        </ul>

    </div>}
    </>
  )

}


const forFavPersonCont = {
    maxWidth:'fit-content',
    padding:'0.5em'
}

const forP = {
    fontSize:'15px',
    color:'#3570EC',
    marginBottom:'10px'
}
 const forFavPersons = {
    display:'flex',
    flexDirection:'column'
}

const forList = {
    display:'flex',
    alignItems:'center',
    padding:'0.8em 0',
    overflowX:'scroll',
    width:'100%'
}

const forFavPerson = {
    display:'flex',
    fontSize:'14px',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
}