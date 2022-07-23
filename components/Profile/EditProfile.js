import React from 'react'


import { InputField } from './InputField';

export const EditProfile = ({loggedUser}) => {
    const keys = Object.keys(loggedUser);
    const values = Object.values(loggedUser);

    // Remove date and ID from user data, because we dont want to update it.
    const propAndKeys = values.map((item, i)=>{
        const isID = item;
        const isDate = item;

        const object = {
            name:keys[i],
            value:item
        }


        if(isNaN(isID) && isNaN(new Date(isDate).getTime())) return object;

    })
    .filter(item=>item!==undefined);

 
  return (
    <div className='edit_profile_overlay' style={forOverlay}>
        <div className='edit_profile' style={forEditProfile}>
                <h2 className='title user_name' style={forTitle}>{loggedUser.first_name}</h2>

            
                {/** For every property name (example. first_name, last_name...) create his own input */}
                <div className='form'>   
                  {
                    
                   propAndKeys.map(item=><InputField name={item.name} value={item.value} />)
                  }
                </div>
        </div>
    </div>  
  )
}


// Style
const forOverlay = {
    background:'rgba(000,000,000,0.8)',
    width:'100%',
    height:'100%',
    position:'fixed',
    top:'0',
    left:'0',
    zIndex:'100',
}

const forEditProfile = {
    position:'absolute',
    top:'1.5em',
    left:'1.5em',
    right:'1.5em',
    bottom:'1.5em',
    borderRadius:'24px',
    background:'linear-gradient(90deg, rgba(215,215,215,1) 0%, rgba(255,255,255,1) 100%)',
    padding:'1em',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
}

const forTitle = {
    color:'#3570EC',
    fontWeight:'500',
    textAlign:'center'
}