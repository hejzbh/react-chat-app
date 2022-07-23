import React, {useState } from 'react'

import { Link } from 'react-router-dom';

// React animation
import Confetti from 'react-confetti'

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BallTriangle} from 'react-loader-spinner'

// Style from login (rule no 1: dont repeat same code twice)
import {forTitleContainer, forLoginPage as forRegisterPage, forLoginInner as forRegisterInner, forLink, forP} from '../Login/Login';

// Icons
import {FaLongArrowAltLeft} from 'react-icons/fa';

// Register form
import { RegisterForm } from '../../components/Form/RegisterForm';

export const Register = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);




  return (
    <div style={forRegisterPage} className='register_page'>

         {/** ANIMATION in case that user was created */}
         {success && <Confetti />}

       <div style={forRegisterInner} className='register_inner container'>
       <div
             className='title_container'
             style={forTitleContainer}>

                     {/**Link to previous page */}

                    <Link
                      className='link'
                      style={forLink}
                      to='/'>{<FaLongArrowAltLeft color='#fff' fontSize={'14px'} />}</Link>

                      <h4
                      style={{fontWeight:'600', fontSize:'21px', letterSpacing:'1px', fontFamily:'montserrat'}}>Register</h4>
               
            </div>

             {/**Spinner */}

             {loading && <BallTriangle
              height="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            />}


              {/** Register form - main part of this component */}
              <RegisterForm
              setSuccess={setSuccess}
              setLoading={setLoading} />
            


            {/** LINK TO LOGIN PAGE */}
            <p
            style={forP}
            >Already have an account? <Link className='link' style={{color:'#fff'}} to='/login'>Login</Link></p>
       </div>
     </div>
  )
}
