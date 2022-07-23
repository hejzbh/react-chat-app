import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
//icons
import {BiUser, BiSearchAlt, BiX} from 'react-icons/bi'

import css from '../style/Main.css'

//components
import { SearchUsers } from './SearchUsers'
import { userContext } from '../context/UserContext'



export const Header = () => {
    const {user} = useContext(userContext);
    const [showSearch, setShowSearch] = useState(false);
    


   return (
    <div className='header' style={forHeader}>
        <div className='inner_header container'>

            <nav style={forNav}>

            {/** Message: Hello (user_name) */}
            <h3 className='greeting' style={forGreeting}>
                Hello,
                <span className='name_of_user' style={forName}>{user?.first_name}</span>
            </h3>

            {/** BUTTON THAT CONTROLS DISPLAY OF INPUT SEARCH */}
            <button
             className='btn nav_search_btn'
             onClick={()=>setShowSearch(prev=>!prev)}
            >

             {/** ShowSearch is true? Show input, else hide it */}
             {!showSearch ? <BiSearchAlt color='#ffff' fontSize='22px'/> : <BiX color='#ffff' fontSize='22px' />}

            </button>
            </nav>

            
            {showSearch && <SearchUsers />}

        </div>
    </div>
  )
}



// CSS Style
const forNav = {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    zIndex:'2',
    minHeight:'5em',
    padding:'1.7em 0',
    borderBottom:'1px solid #fff'
}

const forGreeting = {
    color:'#8FAEF1',
    fontWeight:'400',
    fontSize:'17px',
    lineHeight:'1.6'
}

const forName = {
    color:'#3570EC',
    fontWeight:'500',
    fontSize:'20px',
    display:'block'
}

const forHeader={
    width:'100%',
    padding:'1em 0'
}