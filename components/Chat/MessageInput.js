import React, { useState, useContext } from 'react';

// COntexts
import { ChatContext } from '../../context/ChatContext';
import { userContext } from '../../context/UserContext';

import {FiSend} from 'react-icons/fi'

export const MessageInput = ({chatID}) => {
    const [msgContent, setMsgContent] = useState('');
    const {user} = useContext(userContext);
    const {createNewMessage} = useContext(ChatContext);

    const handleMessageContent = (e) => setMsgContent(e.target.value);


    const sendMessage = (e) => {
        e.preventDefault();
        if(!msgContent) return;

        // create message object
        const msg = {
            content:msgContent,
            sender:user,
            fromMe:true,
            createdAt:new Date()
        }

        // send message object to API then insert him in array of messages

        createNewMessage(msg, chatID.slice(1));

        // clear input
        setMsgContent('');
    }

  return (
    <div className='message_input' style={msgInputContainer}>
        <form onSubmit={sendMessage} style={forForm}>
            
            <input
            style={forInput}
            type='text'
            placeholder='Say something...'
            value={msgContent}
            onChange={handleMessageContent}>
            </input>

            <button style={forBtn} type='submit'>
                    <FiSend fontSize={'19px'} color={'#3570EC'} />
            </button>
        </form>
    </div>
  )
}


const msgInputContainer= {
    padding:'1em 0.8em'
}

const forForm = {
    display:'flex',
    alignItems:'center',
    height:'100%'
}

const forInput = {
    width:'100%',
    resize:'none',
    padding:'1em 0.6em',
    border:'none',
    outline:'none',
    color:'#ACB0C1',
    marginRight:'10px',
    borderRadius:'20px',
    fontFamily:'Poppins',
    fontSize:'12px',
    background:'#F5F6FA'

}

const forBtn = {
    cursor:'pointer',
    background:'none',
    outline:'none',
    border:'none',
    padding:'0.5em'
}

