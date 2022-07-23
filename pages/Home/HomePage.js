import React from 'react'

import { Outlet } from 'react-router-dom';


// Components
import { Header } from '../../components/Header'
import { FooterMenu } from '../../components/FooterMenu'




export const HomePage = () => {

  return (
    <div className='home_page' style={forHomePage}>
   
            <Header/>

                {/** List of all child components: contact, profile and homepage */}
                <div className='content container' style={forContent}>
                   <Outlet />
                </div>

            <FooterMenu/>
    
    </div>
  )
}


// CSS style
const forHomePage = {
  minHeight:'100vh',
  background:'linear-gradient(138deg, rgba(199,232,247,1) 0%, rgba(251,254,255,1) 87%)',
  padding:'2em 0 0 0',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between'
}


const forContent = {
  width:'100%',
  height:'100%',
  minHeight:'32em'
}