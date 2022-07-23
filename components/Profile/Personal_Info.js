import React from 'react'

// Images
import profilePhoto from '../../assets/images/profilePhoto.png'

export const PersonalInfo = ({loggedUser}) => (

    <div
     className='information'
      style={forInformation}>
        
    {/** Profile photo */}
    <img src={profilePhoto} style={forImage}></img>

    {/** First name */}
    <h3 style={forFirstName}>{loggedUser.first_name}</h3>

    {/** Last name */}
    <p>{loggedUser.last_name}</p>

  </div>

  )


// Style CSS

  const forInformation = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    textAlign:'center',
    marginBottom:'20px'
  }
  

  const forImage = {
    width:'100%',
    maxWidth:'122px',
    marginBottom:'1em',
    borderRadius:'50%'
  }
  
  
  const forFirstName = {
    color:'#2A4262',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '19px',
    lineHeight: '16px',
  }
  