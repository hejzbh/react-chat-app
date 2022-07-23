import React, {useState,  createContext, useEffect} from 'react';

// Helper functions
import { stangerInChat } from '../HelperFunctions';

// API Requests
import { postNewChatAPI } from '../API/APIRequests';
import { deleteChatFromAPI } from '../API/APIRequests';
import { getChatAPI } from '../API/APIRequests';
import { postNewMessageAPI } from '../API/APIRequests';


export const ChatContext = createContext();



export const ChatContextProviderr = ({children}) => {
        const [chat, setChat] = useState(); // current chat, chat where we are, active chat...
    


    useEffect(()=>{
        console.log(chat);
    },[chat])

        /// FUNCTION #1 - get chat by chatID
        const getChat = async (chatID, currentUserID) => {

            const chat = await getChatAPI(chatID);
              
            const messages = chat.messages.map(message=>{
                return {...message, 
                fromMe: message.sender.id===currentUserID}
            });

            //  titleOfChat is function that will take a user_name from another side, example(There are two persons in chat (1: Me, 2:Another side)),this function is going to take a another side and set it for title of chat

            setChat({...chat, messages, stranger: stangerInChat(chat, currentUserID)});
        }

        


        /// FUNCTION #2 
        const createNewChat = async (personsInChat) => {

               const chat = await postNewChatAPI(personsInChat);

               return chat;
        }



        /// FUNCTION #3
        const createNewMessage = async (msg, chatID) => {
                try {

                    // put new message in state then send it to API (preformance).
                    setChat(chat=>{
                        return {...chat, messages:[...chat.messages, msg]};
                    });

                    // send to API
                    postNewMessageAPI(msg, chatID);

                } catch(err){
                    throw err;
                }
        }



        // FUNCTION #4
        const deleteChat = async (chatID, setUserActiveChats) => {
            // Delete chat from API
              const deleting = await deleteChatFromAPI(chatID);


            // Delete chat from state
              setUserActiveChats((chats)=>{
               return chats.filter(chat=>chat.id!==chatID)
              });
        }
    




     const contextValue = {
        chat,
        setChat,
        createNewMessage,
        getChat,
        createNewChat,
        deleteChat
     }

    return (
        <ChatContext.Provider value={{
            ...contextValue
        }}>
            {children}
        </ChatContext.Provider>
    )
}