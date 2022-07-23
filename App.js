import React, {useState, useEffect, useReducer, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Css
import appcss from './style/App.css'

// Helper functions
import { getSession } from './HelperFunctions';

// Components <-----

import { EntryPage } from './pages/Entry/EntryPage';
import { HomePage } from './pages/Home/HomePage';
import { Login } from './pages/Login/Login';
import { Chat } from './components/Chat/Chat';
import { Register } from './pages/Register/Register';

import { PreHeader } from './components/PreHeader';
import { Profile } from './components/Profile/Profile';
import { Contacts } from './components/Contact/Contacts';
import { PreviewOfChats } from './components/PreviewOfChats';

// Context
import { userContext } from './context/UserContext';
import { ActiveChatsProvider } from './context/ActiveChats';
import { ChatContext } from './context/ChatContext';

import { useNavigate } from 'react-router-dom';

function App() {
    const {user, setUser} = useContext(userContext);
    const {chat} = useContext(ChatContext); //active chat (chat where we are in the moment)
    let navigate = useNavigate();


  useEffect(()=>{

        const session = getSession();

        if(session?.remember) {
          setUser(session.user);
          navigate('/homepage')
        };
        
  }, []);

 


    const createRoutes=(path, element)=>{
      return <Route element={element} path={path}></Route>; 

    }

  return (
    <div className="App">

            <ActiveChatsProvider currentUserID={user?.id} activeChat={chat}>


            <PreHeader />
            <Routes>
              {/** Only if user exist homepage will be enabled */}
             {user && <Route path='/homepage' element={<HomePage />}>
                <Route path='profile' element={<Profile user={user} />}></Route>
                <Route path='contacts' element={<Contacts />}></Route>
                <Route path='/homepage' element={<PreviewOfChats />}></Route>
              </Route>}

             
             {['/','/welcome'].map(path => createRoutes(path, <EntryPage />))}

             <Route path='/login' element={<Login />}></Route>
             <Route path='/register' element={<Register />}></Route>
             <Route path='/chat:id' element={<Chat/>}></Route>

            </Routes>


            </ActiveChatsProvider>
        
    </div>
  );
}

export default App;
