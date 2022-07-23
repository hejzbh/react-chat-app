import React from 'react'

// Image 
import noContactsPNG from '../../assets/images/friends.png';

export const NoContactsFound = () => {
  return (
    <div className='no_contacts_found' style={forContainerDIV}>
          <img src={noContactsPNG} style={forImage}></img>
          
          <h3 style={forH3}>You have no contacts</h3>

          <h4 style={forH4}>Add the first one and have fun</h4>
    </div>
  )
}


// Style - CSS
const forImage = {
  width:'100%',
  maxWidth:'90px',
  marginBottom:'2em'
}

const forContainerDIV = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'column'
}

const forH4 = {
    color: 'gray',
    fontSize: '15px',
    fontWeight:'400'
}

const forH3 = {
  fontSize:'17px',
  color:'#505664',
  marginBottom:'0.3em',
  fontWeight:'500',
  textShadow:'1px 2px 3px rgba(000,000,000,0.3)'
}