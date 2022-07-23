import React, {useEffect, useState, createContext} from "react";

// Helper functions
import { stangerInChat } from "../HelperFunctions";

// API Requests
import { getUserActiveChatsAPI } from "../API/APIRequests";


export const ActiveChats = createContext();

export const ActiveChatsProvider = ({children, currentUserID, activeChat}) => {
    
        const [userActiveChats, setUserActiveChats] = useState([]); // All chats that are displayed on the home page
 

        // Fetching data

        useEffect(()=>{

            const getUserActiveChats = async () => {
                  const chats =  await getUserActiveChatsAPI(currentUserID);
             
           
                  setUserActiveChats([...chats]);
            };

            getUserActiveChats();

        }, [currentUserID, activeChat]);



        // For every chat set a title of him.
        const chats = userActiveChats.map(chat=>{
            return {...chat, stranger: stangerInChat(chat, currentUserID)};
        });
   


    return (
        <ActiveChats.Provider value={{chats, setUserActiveChats}}>
            {children}
        </ActiveChats.Provider>
    )
};
