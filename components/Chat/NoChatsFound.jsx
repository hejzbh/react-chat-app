import React from 'react'

// Images
import NoChatsFoundPhoto from '../../assets/images/noChatFound.png'

export const NoChatsFound = () => {
  return (
    <div>
        <div style={forNoChatsFound}>
          <img src={NoChatsFoundPhoto} style={{width:'100%', maxWidth:'130px'}}></img>

          <h3 style={{color:'#fff', margin:'1em'}}>No chats found</h3>

          <p style={{color:'gray', fontSize:'15px'}}>Start your first conversation</p>
       
        </div>
    </div>
  )
}

const forNoChatsFound = {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }