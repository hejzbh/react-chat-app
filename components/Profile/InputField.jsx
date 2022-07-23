import React, {useEffect, useState, useContext} from 'react'
import { firstLetterUpper } from '../../HelperFunctions';

// Context
import { userContext } from '../../context/UserContext';

//Icons
import {RiEdit2Fill} from 'react-icons/ri'
import {FcCheckmark} from 'react-icons/fc'
import {AiOutlineClose} from 'react-icons/ai'

// Animation
import { Fade } from 'react-awesome-reveal';

// Helper functions
import { fixEmail } from '../../HelperFunctions';
import { checkErrors } from '../../HelperFunctions';
import { instructionMessage } from '../../HelperFunctions';


// API Requests
import { updateUserAPI } from '../../API/APIRequests';

// Icons
let EditIcon = <RiEdit2Fill />;
let CloseIcon = <AiOutlineClose />;

export const InputField = ({name, value}) => {
    const {user, setUser} = useContext(userContext); //logged user
    const [updatedUser, setUpdatedUser] = useState(user); //object with new values

    const [showInput, setShowInput] = useState(false); 
    const [inputValue, setInputValue] = useState(value);

    const correctName = name.split('_').flatMap(item=>firstLetterUpper(item)).join(' '); // converts 'last_name' to 'Last Name'


    // Update (updatedUser) whenever input changes
    useEffect(()=>{
                updateUserData();
    }, [inputValue]);



    // FUNCTION - Update user data
    const updateUserData = () => {
    
        setUpdatedUser({...user, [name]:
        name==='email' ? fixEmail(inputValue) :
        name==='first_name' ||
        name==='last_name' ? firstLetterUpper(inputValue) :
        inputValue });

    }



     // FUNCTION - Fully update logged user (submit)
    const submitChange = async (e) => {
        e.preventDefault();

        // Check if the new value is different from original

        const noChange = Object.values(updatedUser).every((updatedValue, i) => updatedValue === Object.values(user)[i]);
      
        // In case there is no changes, return
        if(noChange) return;

        // Check for errors
        const noErrors = checkErrors(updatedUser);

        // In case that errors doesnt exist, update user data.
        if(noErrors){
            const updatedDataForUser = await updateUserAPI(user, name, inputValue);

            setUser(updatedDataForUser);
        }


    };


   

  return (
    <div className='edit_field' style={forEditField}>

        <div className='top' style={forTop}>

            {/** Every input has own informations, (first name, email or something else) */}

            <div className='info'>
                <h4 className='name' style={forH3}>{correctName}</h4>
                <p className='value' style={forP}>{value}</p>
            </div>

            {/** Button that controls the display of input */}
            <button
             className='show_input_btn btn'
             style={forShowBtn}
             onClick={()=>setShowInput(prev=>!prev)}>{showInput ? CloseIcon : EditIcon}</button>  


        </div>

        {/** --- I N P U T ---- */}
        {showInput && (
            <Fade duration={500}>

                <form onSubmit={submitChange} style={forForm}>
                        <input
                        style={forInput}
                        name={name}
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        />

                  

                        <button
                        style={forSubmitBtn}
                        className='btn submit_change_btn'
                        type='submit'><FcCheckmark /></button>

                </form>

           </Fade>
        )}

        {/** In case that we submited form, there's will be error message if something isn't correct.
         
        * In case that we are typing something in input, display instruction message for that type (example. email) to make it correct/right.
         */}
        <p
         className='error_message instruction_message'
         style={forMessage}>

            {inputValue.length>0 && instructionMessage(name, inputValue)}

        </p> 
    </div>
  )
}



///////////////////////
// STYLE - C S S 
///////////////////////

const forEditField = {
    padding:'1em',
    borderRadius:'14px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    border:'3px solid #DDDDDD',
    marginBottom:'1em'
}

const forShowBtn = {
    padding:'0.8em',
    fontSize:'16px'
}

const forSubmitBtn = {
    padding:'0.8em',
    fontSize:'18px'
}

const forTop = {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'flex-start'
}

const forForm = {
    width:'100%',
    alignItems:'center',    
    display:'grid',
    gridTemplateColumns:'80% 20%'


}

const forInput = {
    border:'0',
    outline:'none',
    padding:'0.8em',
    borderRadius:'8px'
}


const forH3 = {
    color:'#949494',
    fontWeight:'500',
    fontSize:'15px'
}

const forP = {
    fontSize:'14px'
}


const forMessage = {
    fontSize:'14px',
    color:'rgb(218, 90, 250)'
}