import React, {useState, useEffect, useContext} from 'react'

// Context
import { ActiveChats } from '../context/ActiveChats';

// Helper functions
import { messagePreview } from '../HelperFunctions';
import { dateDifferently } from '../HelperFunctions';

import {Link} from 'react-router-dom';

// Images
import ProfilePhoto from '../assets/images/profilePhoto.png'

// Icons
import {FaRegClock} from 'react-icons/fa'

// Components
import { NoChatsFound } from './Chat/NoChatsFound';



export const PreviewOfChats = () => {
  const {chats} = useContext(ActiveChats);




  return (
    <div>
       {chats && chats.map(chat=>{
    
        let [lastMessage] = chat.messages.slice(-1) || null;
   

       return <Link to={`/chat:${chat.id}`} style= {{textDecoration:'none'}}>

          <div style={forUserLinkDIV}>  

              {/** Profile photo of stranger */}
              <img src={ProfilePhoto} style={forImage}></img>

              {/** Infos about chat (last massage, how much time did pass from last massage...) */}

              <div className='info' style={forChatInfo}>
                 <h3 style={forInfoTitle}>{chat.stranger.first_name}</h3>
                 <p 
                 style={forInfoP}>
                  
                  {/** LAST MESSAGE */}
                  {messagePreview(lastMessage?.content) }</p>
              </div>

                {/** HOW MUCH TIME DID PASS FROM LAST MASSAGE */}
               <p className='time_since_last_message' style={forTimeSince}>
                  <FaRegClock style={{marginRight:'5px'}} />
                  {dateDifferently(new Date(), new Date(lastMessage?.createdAt))}
              </p>

          </div>
        </Link>

       })}

        {/** IN CASE THERE IS NO CHATS, SHOW MESSAGE ABOUT IT */}
       {chats.length<1 && <NoChatsFound />}
    </div>
  )
}


// Style
const forUserLinkDIV = {
  width:'100%',
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  padding:'1em',
  borderRadius:'22px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  marginBottom:'1em'
}


const forImage = {
  width:'100%',
  maxWidth:'37px',
  marginRight:'14px',
  borderRadius:'50%'
}

const forChatInfo = {
  width:'100%',
  display:'flex',
  flexDirection:'column',
  alignItems:'flex-start',
  justifyConten:'flexStart'
}

const forInfoTitle = {
  color:'#505664',
  fontWeight:'500',
  marginBottom:'2px',
  fontSize:'17px'
}

const forInfoP = {
  fontSize:'15px',
  color:'#505664'
}

const forTimeSince = {
  fontSize:'13px',
  textAlign:'right',
  color:'#AEB3C2',
  minWidth:'80px'
}