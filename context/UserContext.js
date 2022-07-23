import React , { createContext, useState, useEffect } from "react";

// Helper functions
import { rememberLogin } from "../HelperFunctions";

export const userContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(()=>{
    
        rememberLogin(user);
        
    }, [user]);

    return(
        <userContext.Provider
        value={{
            user,
            setUser
        }}
        >
            {children}
        </userContext.Provider>
    )
}   