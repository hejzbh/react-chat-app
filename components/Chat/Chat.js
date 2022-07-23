import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Context
import { userContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';
import { ActiveChats } from '../../context/ActiveChats';

//  Images
import profilePhoto from '../../assets/images/profilePhoto.png';

// Loader
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BallTriangle} from 'react-loader-spinner'

// Components
import { MessageInput } from './MessageInput';
import { Message } from './Message';
import { NoMessagesFound } from './NoMessagesFound';

// Icons
import {BsTrash} from 'react-icons/bs'


export const Chat = () => {
    const {id:ChatID} = useParams();

    const [loading, setLoading] = useState(false);

    const {setUserActiveChats} = useContext(ActiveChats);
    const {user} = useContext(userContext);
    const {chat, getChat, deleteChat} = useContext(ChatContext);

    useEffect(()=>{
       
        fetchingChat();

    }, [user]);

    const fetchingChat = async () => {
        try {

             setLoading(true);
        
             await getChat(ChatID.slice(1), user?.id);

             setLoading(false);

        } catch(err){
            setLoading(false);
            throw err;
        }
    }

  return (
    <div className='conversation' style={forConversation}>
          <ChatHeader
           id={chat?.id}
           deleteChat={deleteChat}
           setUserActiveChats={setUserActiveChats}
           stranger={chat?.stranger}
        />

        <div
         className='conversation_container container'
         style={forConversationContainer}>

            {/** LOADING */}
            {loading && <BallTriangle />}

            {/** DISPLAY ALL MESSAGES */}
            {chat?.messages?.map(item=>(
                <Message  message={item}/>
            ))}

             {/** SHOW MESSAGE IN CASE THAT THERE IS NO MESSAGES */}
            {!chat?.messages.length && <NoMessagesFound />}

        </div>

        <MessageInput chatID={ChatID} />
    </div>
  )
}

const ChatHeader = ({ id, deleteChat, setUserActiveChats, stranger={first_name:'Loading'}}) => {
   let navigate = useNavigate();

    return (
        <div className='chat_user_info' style={forUserInfo}>
            <img src={profilePhoto} style={forImage}></img>

            <div className='personal_info'>
                <h4 style={forName}>{stranger.first_name}</h4>
            </div>

            {/** Delete chat function */}
            <button
            className='btn'
            onClick={()=>{
                deleteChat(id, setUserActiveChats);
                navigate('/homepage');
            }}>
                <BsTrash color={'red'} fontSize='20px' />
            </button>
        </div>
    )
}


// Style css
const forConversation = {
    minHeight:'95vh',
    background: 'rgb(34,39,61)',
    background:'linear-gradient(138deg, rgba(251,254,255,1) 0%,rgba(199,232,247,1) 87%)',
    display:'flex',
    flexDirection:'column',
    marginTop:'5vh'
}
const forConversationContainer = {
    overflowY:'scroll',
    height:'80vh',
    padding:'1em 0'
}

export const forImage = {
    width:'100%',
    maxWidth:'40px',
    marginRight:'8px',
    borderRadius:'50%'
}

const forName = {
    color:'#fff',
    fontWeight:'400',
    fontSize:'16px'
}

const forUserInfo = {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'1em 0.8em',
    background:'linear-gradient(90deg, rgba(108,147,230,1) 0%, rgba(234,188,246,1) 100%)',
    borderRadius:'0 0 14px 14px',
    zIndex:'3',
    position:'sticky',
    top:'3em',
    left:'0'

}