import React from 'react'

import { useLocation , useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'

import {FaUserFriends, FaHome} from 'react-icons/fa'
import {BiUser} from 'react-icons/bi'
import { fixUperCaseWord } from '../HelperFunctions'

import css from '../style/Main.css'

export const FooterMenu = () => {
    const location = useLocation();


    const linkNames = ['contacts', '/homepage', 'profile'];
    const icons = [<FaUserFriends />, <FaHome />, <BiUser  />];
    
    // name of current page, example. /homepage
    const locationPath = location?.pathname.slice(location.pathname.lastIndexOf('/'));


 
  return (
    <footer className='menu' style={forFooter}>

       {linkNames.map((linkName, i)=>{

        // If linkname is not /homepage, it means that there is no "/", so we will add it through this function
        const urlEqualName = locationPath===(linkName!=='/homepage' ? `/${linkName}`: linkName);

          return <Link to={linkName}
          className={
           `footerLink 
           ${urlEqualName && `footerLinkActive`}
           `
          }>
          {icons[i]}
        </Link>
       })}
      
    </footer>
  )
}




// CSS - Style

const forFooterLink = {
    padding:'2em',
    borderRadius:'50%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    color:'#fff',
    fontFamily:'Poppins',
    textTransform:'uppercase',
    fontSize:'13px',
}

const activeLink = {
  ...forFooterLink,
 transform:'translateY(-20%)',
 transition:'250ms ease',
 background:'linear-gradient(138deg, rgba(218,90,250,1) 0%, rgba(53,112,236,1) 100%)'
}

const forFooter = {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around',
    padding:'1em 0',
}