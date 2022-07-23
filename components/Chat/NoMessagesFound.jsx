import React from 'react'

// Image
import noMessagesPNG from '../../assets/images/noMessages.png'

export const NoMessagesFound = () => {
  return (
    <div style={forDIV}>
        <img src={noMessagesPNG} style={forImage}></img>
        <p style={forP}>No messages</p>
    </div>
  )
}


// Style - CSS
const forDIV = {
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
}

const forImage = {
    width:'100%',
    maxWidth:'150px',
    marginBottom:'2em'
}

const forP = {
    fontWeight:'500',
    fontSize:'16px',
    color:'gray'
}