import React, {useState} from 'react';
import {Link} from 'react-router-dom'

// Images
import wavesPNG from '../../assets/images/wave.png'
import introPNG from '../../assets/images/Group 5.png'

//Icons
import {RiArrowRightLine} from 'react-icons/ri'


{/** This is a page that displayed first when user entering the site */}
export const EntryPage = () => {


  return (
    <div
     className='entry_page'
     style={forEntryPage}>
        <img
         className='entry_background'
         src={wavesPNG}
         style={forEntryBG}>    
        </img>
        
          <div
           className='entry_inner container'
           style={forEntryInner}>

                  <div
                   className='introduction'
                   style={forIntroduction}>
                      <img
                       className='intro_small_photo'
                       src={introPNG}
                       style={forSmallPNG}
                      >
                      </img>
                      <p
                       className='intro_text'
                       style={forIntroText}
                       >Chat With your friends and share photos, voice and short video messages.</p>

                        {/** LINK TO LOGIN */}
                       <Link
                        to='/login'
                        className='get_started_btn link'
                        style={forLinkBTN}>{<RiArrowRightLine />}</Link>
                  </div>

          </div>
    </div>
  )
}



// Style
const forEntryPage = {
  background: 'linear-gradient(138deg, rgba(199,232,247,1) 0%, rgba(251,254,255,1) 87%)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  minHeight:'100vh',
  position:'relative',
  zIndex:'1'
}

const forEntryBG = {
  width:'100%',
  height:'100%',
  zIndex:'-1',
  position:'absolute',
  top:'0',
  left:'0'
} 

const forSmallPNG = {
  width:'100%',
  height:'100%',
  maxWidth:'450px'
}

const forIntroText = {
  fontSize:'17px',
  color:'#3570EC',
  lineHeight:'40px',
  fontFamily:'Montserrat',
  textAlign:'center'
}

const forIntroduction = {
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
}

const forEntryInner = {
  minHeight:'100vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  padding:'0 1em'
}

const forLinkBTN = {
  background: 'rgb(60,164,247)',
   background:'linear-gradient(348deg, rgba(60,164,247,1) 0%, rgba(121,69,249,1) 94%)',
   padding:'1em 3em',
   borderRadius:'28px',
   fontSize:'20px',
   transition:'250ms ease'
   
}