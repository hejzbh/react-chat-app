import React from 'react'

export const Button = ({className, title, onClick}) => {

  const buttonAnimation = (e) => {

    e.target.style.transform='scale(1.3)';
    e.target.style.color='#D2D1D7';

    setTimeout(() => {
      e.target.style.transform='unset';
      e.target.style.color='#8C6FF7';
    }, 100);
    
  }

  return (
    <div
     className={`${className} btn`}
     onClick={(e)=>{
      onClick();
      buttonAnimation(e);
     }}
     style={buttonStyle}
     
     
     >
      {title}
    </div>
  )
}


const buttonStyle = {
  padding:'1.5em',
  fontSize:'25px',
  fontWeight:'500',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  textAlign:'center',
  color:'#8C6FF7',
  fontFamily:'Poppins',
  cursor:'pointer',
  transition:'250ms ease'
}
