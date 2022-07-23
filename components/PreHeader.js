import React, {useEffect, useState} from 'react'

// Image
import batteryPNG from '../assets/images/battery.png';
import wifiPNG from '../assets/images/wifi.png'
import connectionPNG from '../assets/images/connection.png'

export const PreHeader = () => {
    const [time, setTime] = useState('');


   useEffect(()=>{

        /** UPDATE time every 50s */
        setInterval(()=>{
            updateTime();
        }, 50000)

        updateTime();

   }, []);

   const updateTime = () => {

            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            

            setTime(`${hours} : ${`${minutes}`.padStart(2, 0)}`);
   }

  return (
    <div
     className='pre_header'
     style={forPreHeader}>

    
        <div
        className='mobile_header'
        style={forMobileHeader}>

            {/** CURRENT TIME */}
            <p
             className='current_time'
             style={{color:'#fff', fontSize:'17px'}}
            >{time}</p>

            
            <div className='icons'>
                    <img className='icon_header' src={connectionPNG}></img>
                    <img className='icon_header' src={wifiPNG}></img>
                    <img className='icon_header' src={batteryPNG}></img>
            </div>

        </div>
   

    </div>
  )
}



// CSS - Style
const forPreHeader = {
    position:'fixed',
    top:'0',
    left:'0',
    width:'100%',
    padding:'0.8em 1em',
    zIndex:'5',
    textAlign:'center',
    background:'#061B2D'
}

const forMobileHeader = {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
}

