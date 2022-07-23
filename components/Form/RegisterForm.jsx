import React, {useState} from 'react'

// Style from login form - (rule no1: dont repeat same code twice)
import { forInput, forError, forLabel, forForm } from './LoginForm';

// Helper functions
import {
     fixEmail,
     firstLetterUpper,
     checkErrors,
     cutBlankSpace,
    instructionMessage } from '../../HelperFunctions';

// API Requests
import { crateNewUserAPI } from '../../API/APIRequests';

export const RegisterForm = ({setSuccess, setLoading}) => {
    const [registerInfo, setRegisterInfo] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:''
    });


    const submit = async (e) => {
        e.preventDefault();
    
        try {
           // Check for errors
            const noErrors = checkErrors(registerInfo);
    
            // If there is not errors, create new user
            if(noErrors){
    
               setLoading(true);
               await crateNewUserAPI(registerInfo);
               setLoading(false);
    
              // user successfully created ? set succes to true, then animation will be launched
              setSuccess(true);
    
            } 
    
        }
        catch(err){
            alert(err);
           setLoading(false);
        }
    }
    
    // FUNCTION - takes value from input then state will be updated 
    
    const handleInputChange = (e) => {
     const {name, value, type} = e.target;
    
     setRegisterInfo((registerInfo)=>({...registerInfo,
        [name]: 
        name==='last_name' || name==='first_name' ? firstLetterUpper(value) :
        name==='email' ? fixEmail(value) : cutBlankSpace(value)
        }));
    }
    
  return (
    <form
    className='form login_form'
    style={forForm}
    onSubmit={submit}>

      {/**Email label*/}

      <label
       htmlFor='first_name'
       style={forLabel}>First name</label>

       {/**Email input*/}

      <input
       style={forInput}
       type='text'
       name='first_name'
       value={registerInfo.first_name}
       onChange={handleInputChange}
     ></input>

      {/**Email error or instruction message*/}
      <p
       className='error_message'
       style={forError}>

      {registerInfo.first_name &&
      instructionMessage('first_name', registerInfo.first_name)}
      
      </p>



      {/**Last name label*/}

      <label htmlFor='last_name' style={forLabel}>Last name</label>

      {/**Last name input*/}

      <input
       style={forInput}
       type='text'
       name='last_name'
       value={registerInfo.last_name}
       onChange={handleInputChange}
       ></input>

      {/**Last name error or instruction message*/}
      <p
        className='error_message'
        style={forError}>

        {registerInfo.last_name &&
        instructionMessage('last_name', registerInfo.last_name)}

      </p>



        {/**Email label*/}

       <label htmlFor='email' style={forLabel}>Email</label>

          {/**Email input*/}

          <input
          style={forInput}
          type='text'
          name='email'
          value={registerInfo.email}
          onChange={handleInputChange}
          ></input>

          {/**Email error or instruction message*/}

          <p
          className='error_message'
          style={forError}>

          {registerInfo.email &&
          instructionMessage('email', registerInfo.email)}

          </p>


       {/**Password label*/}

       <label htmlFor='password' style={forLabel}>Password</label>

      {/**Password input*/}

      <input
      style={forInput}
      type='password'
      name='password'
      value={registerInfo.password}
      onChange={handleInputChange}
      ></input>

      {/**Password error or instruction message*/}

      <p
      className='error_message'
      style={forError}>

      {registerInfo.password &&
      instructionMessage('password', registerInfo.password)}

      </p>

          

        {/**Submit BTN*/}

       <button
       className='form_submit btn'
       type='submit'>
          Create your account
       </button>
  </form>
  )
}
