import React, {useState} from 'react'
// Helper functions
import { instructionMessage,
fixEmail,
cutBlankSpace,
checkErrors,
 } from '../../HelperFunctions';

 
 // API Requests
 import { findUserToLogin } from '../../API/APIRequests';

export const LoginForm = ({setLoading, setUser}) => {
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    });
    
    
      const handleInputChange = (e) => {
    
        const {name, value} = e.target;
        
    
        setLoginInfo((loginInfo)=>({...loginInfo, [name]:name==='email' ? fixEmail(value) : cutBlankSpace(value)}));
      }
    
    
    
    
      const submit = async (e) => {
          e.preventDefault();
          try {
             // Check for input errors   
            const noErrors = checkErrors(loginInfo);
           
            // no errors ? try to login
            if(noErrors){
              setLoading(true);
    
              const user = await findUserToLogin(loginInfo);
              
              setLoading(false);
    
              // set logged user
              setUser(user);        
            }
           
    
    
          } catch(err){
            setLoading(false);
            alert(err);
          }
      }

  return (
    <form
    className='form login_form'
    style={forForm}
     onSubmit={submit}>

       {/**Email label*/}
       <label
        htmlFor='email' style={forLabel} >Email</label>

        {/**Email input*/}
       <input
        style={forInput}
        type='text'
        name='email'
        value={loginInfo.email}
        onChange={handleInputChange}
      ></input>

       {/**Email instruction or error message*/}
       <p
        className='error_message'
        style={forError}>

       {loginInfo.email &&
       instructionMessage('email', loginInfo.email)}
       
       </p>

       {/**Password label*/}
       <label htmlFor='password' style={forLabel}>Password</label>

       {/**Password input*/}
       <input
        style={forInput}
        type='password'
        name='password'
        value={loginInfo.password}
        onChange={handleInputChange}
        ></input>

       {/**Password instruction or error message*/}
       <p
         className='error_message'
         style={forError}>

         {loginInfo.password &&
         instructionMessage('password', loginInfo.password)}

       </p>

         {/**Submit BTN*/}

        <button
        className='form_submit btn'
        type='submit'>
           Log in
        </button>

   </form>
  )
}



export const forForm = {
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    width:'100%'
  }
  
export const forInput = {
    padding:'1em 0.3em',
    borderRadius:'14px',
    background:'rgba(000,000,000, 0.1)',
    margin:'1em 0',
    color:'#505664'
  }
  
export const forError = {
    color:'#DA5AFA',
    fontSize:'14px',
    marginBottom:'1em',
    
  }
  
  
export const forLabel = {
    color:'#3570EC',
    fontSize:'15px'
  }