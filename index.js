import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/UserContext';
import { ContactContextProvider } from './context/ContactContext';
import {ChatContextProviderr} from './context/ChatContext';
import {BrowserRouter as Router} from 'react-router-dom'
import MainCSS from './style/Main.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

   <UserContextProvider>
    <ContactContextProvider>
      <ChatContextProviderr>

         <App />

        </ChatContextProviderr>
    </ContactContextProvider>
   </UserContextProvider>

      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
