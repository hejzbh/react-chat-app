import React, {useState, useEffect, useReducer, useRef, useContext} from 'react'

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BallTriangle} from 'react-loader-spinner'

// Icons
import {FaLongArrowAltLeft} from 'react-icons/fa';

import { Link } from 'react-router-dom';

// Context
import { userContext } from '../../context/UserContext';

// Login form
import { LoginForm } from '../../components/Form/LoginForm';


export const Login = () => {
  const {setUser, user} = useContext(userContext);
  const [loading, setLoading] = useState();



  return (
    <div
     className='login_page'
     style={forLoginPage}>
      
        <div
         className='login__inner container'
         style={forLoginInner}>

            <div
             className='title_container'
             style={forTitleContainer}>

                    {/**Link to previous page */}
                    <Link
                      className='link'
                      style={forLink}
                      to={user ? '/homepage' : '/'}>{<FaLongArrowAltLeft color='#3570EC' fontSize={'14px'} />}</Link>

                      <h4
                      style={{fontWeight:'600', fontSize:'21px', letterSpacing:'1px', fontFamily:'montserrat'}}>Log in</h4>

                    
              
            </div>

              {/**Spinner */}

              {loading && <BallTriangle
              height="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            />}



              {/**Login form - main part of this component*/}
              <LoginForm
               setLoading={setLoading}
               setUser={setUser} />
            

            {/** LINK TO REGISTER PAGE */}
            <p
            style={forP}
            >Dont have an account? <Link className='link' style={{color:'#3570EC'}} to='/register'>Sign up</Link></p>

        </div>
    </div>
  )
}


// Style - CSS
export const forLoginPage = {
  background: 'linear-gradient(138deg, rgba(199,232,247,1) 0%, rgba(251,254,255,1) 87%)',
  padding:'5em 0'
}

export const forLoginInner={
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  alignItems:'center',
  minHeight:'56em',
  width:'100%',
  overflow:'hidden'
}

export const forLink = {
  color:'#3570EC',
  padding:'0.7em',
  borderRadius:'12px',
  border:'1px solid #5A76F8',
  textDecoration:'none',
  fontSize:'14px',
  boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
  marginRight:'8px',
}

export const forTitleContainer = {
  display:'flex',
  alignItems:'center',
  color:'#3570EC',
  justifyContent:'flex-start',
  width:'100%'
}


export const forP= {
  color:'#727272',
  textAlign:'center',
 
}