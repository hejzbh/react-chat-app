import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Context
import { userContext } from "./UserContext";

// API Requests
import { deleteContactAPI, addContactAPI, getAllContacts } from "../API/APIRequests";



export const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
        const [ userContacts, setUserContacts ] = useState([]); //All user contacts
        const { user } = useContext(userContext); // Logged user

             
        // #1 - Function that takes all contacts from api and all of them set in the state.

        const updateUserContacts = async (userID) => {
            const contacts = await getAllContacts(userID); // get all user contacts from api

            setUserContacts(contacts);
        }



        // Fetching data

        useEffect(()=>{
            // if we log in with another account, this useEffect will be relaunched 
                if(!user) return;
                updateUserContacts(user.id);

        }, [user]);


     



        // #2 Function

        const deleteContact = async (userID, contactID) => {

            // 1)  Find id from state
            const ID = userContacts.findIndex(user=>user.id===contactID); 
            
            // 2) Delete this contact from API by index from STATE (indexs from state always starts from 0, so we must to increase it by 1)
            const deleting = await deleteContactAPI(userID, ID+1);
            
            // 3) Update state
            setUserContacts(users => users.filter(item=>item.id!==contactID)); // Delete contact from state
        }




        // #3 Function

        const addContact = async (userID, newContact) => {
            
            // 1) There is no much to say, just add contact to API
            const adding = await addContactAPI(userID, newContact);
            
            // 2) Update state
            updateUserContacts(userID);

            
        }


     

        return(
            <ContactContext.Provider
            value={{
                userContacts,
                setUserContacts,
                deleteContact,
                addContact
            }}> 
                    {children}
            </ContactContext.Provider>
        )
}

