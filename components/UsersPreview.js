import React, { useEffect, useReducer } from 'react'
import { useContext, useState } from 'react';
import { userContext } from '../context/UserContext';
import { ContactContext } from '../context/ContactContext';
import { Link, useNavigate } from 'react-router-dom';

import { doesChatExist } from '../API/APIHelpers';
import { ChatContext } from '../context/ChatContext';

import { Router, Navigate, u } from 'react-router-dom';


// Icons
import { ImUserPlus } from 'react-icons/im'
import { ImUserMinus } from 'react-icons/im'

// Images
import profilePhoto from '../assets/images/profilePhoto.png'

export const User = ({user, displayButton=false, style}) => {
  // State
  const [chatID, setChatID] = useState();

  // Context
  const {user: loggedUser} = useContext(userContext);
  const {createNewChat} = useContext(ChatContext);
  const {userContacts: loggedUserContacts, addContact, deleteContact} = useContext(ContactContext);

  // Navigate
  let navigate = useNavigate();

  //
  const isContact = loggedUserContacts.some(item=>item.id===user.id);



  // Whenever chatID changes this useEffect will be runned and this function will locate us to CHAT.
  useEffect(()=>{
    if(chatID){
      navigate(`/chat:${chatID}`);
    }
  }, [chatID]);




  const findChat= async (e)=> {

    // try to find chat 
    const chat = await doesChatExist(user, loggedUser);

    // if there is a chat, set chatID
    if(chat){
       setChatID(chat.id);
      }
    else {
      // is there is no chat, create new one and set chatID
      const newChat = await createNewChat({user, loggedUser}); 
      setChatID(newChat.id);  
  
    }

  }

 

  const buttonStyle = {
    display : displayButton ? 'block' : 'none',
    zIndex:'5',
    padding:'0.5em'
  }

  return (
    <div style={{position:'relative'}}>
              <div onClick={findChat} key={user.id} style={style}>

              {/** PHOTO */}
              <div className='user_photo_container' style={forImgContainer}>
                <img style={forImage} src={profilePhoto}></img>
              </div>

              {/** INFO */}
              <div className='user_info' style={{textAlign:'center', fontSize:'13px', color:'#fff'}}>
                <p className='first_name'>{user.first_name}</p>
                <p className='last_name'>{user.last_name}</p>
              </div>

              
              </div>


              {/** If the logged user is friend to this user, show buttons (delete contact or add contact, it depends)  */}
              {loggedUser.id!==user.id &&

            (isContact ?

            <button
            className='btn'
            style={{...forContactBTN, ...buttonStyle}}
            onClick={()=> deleteContact(loggedUser.id, user.id)}>
            <ImUserMinus color='red' fontSize={'19px'} /> </button> 

            :

            <button
            className='btn'
            style={{...forContactBTN, ...buttonStyle}}
            onClick={()=> addContact(loggedUser.id, user)}>
            <ImUserPlus color='greenyellow' fontSize={'19px'} /></button>)}
                </div>
              

              )
}

const forContactBTN = {
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)'
}


const forImage = {
  width:'100%',
  maxWidth:'34px',
  display:'block',
  borderRadius:'50%'
}

const forImgContainer = {
  outline:'2px solid #DA59FA',
  outlineOffset:'2px',
  borderRadius:'50%',
}