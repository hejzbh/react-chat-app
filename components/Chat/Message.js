import React, {useRef} from 'react'

import css from '../../style/Main.css'

import profilePhoto from '../../assets/images/profilePhoto.png'

import { dateDifferently } from '../../HelperFunctions';



export const Message = ({message}) => {
  const messageRef = useRef();

  const showTime = () => {
    const currentStyle = window.getComputedStyle(messageRef.current).display;

    messageRef.current.style.display= currentStyle === 'flex' ? 'none' : 'flex';
  }

  return (
    <div onClick={showTime}
     className={`message ${message.fromMe ? 'from_me' : ''}`}>
        <>
        <img
             src={message.sender.image }
             style={{...forImage,
             marginRight:message.fromMe ? '0' : '8px',
             marginLeft:message.fromMe? '8px' : '0'}}></img>


            <p className='msg_content'>
                {message.content}

            </p>
        </>

            {message.fromMe && <p className='fromMeP'>You</p>}
            
            <p
             ref={messageRef}
             className='time_of_msg'
             style={{
              ...forMessageTime,
              marginRight:message.fromMe ? '10px' : '0',
              marginLeft:!message.fromMe ? '10px' : '0'
             }}>

             {dateDifferently(new Date(), new Date(message.createdAt))}</p>

          
    </div>
  )
}


const forImage = {
    width:'100%',
    maxWidth:'25px'
}

const forMessageTime = {
  fontSize:'13px',
  display:'none',
  color:'#d2d2d2'
  
}