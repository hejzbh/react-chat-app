import React, {useEffect, useState} from 'react'

//Work with data
import { getAllUsers } from '../API/APIRequests';

import ReactPaginate from "react-paginate";

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BallTriangle} from 'react-loader-spinner'

import css from '../style/Main.css'

import { User } from './UsersPreview';

export const SearchUsers = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Paginate
  const [curPage, setCurPage] = useState(0);
  const resPerPage = 5;
  const allPages = searchResults.length/resPerPage;
  const usersResult = searchResults.slice(curPage*resPerPage,  (curPage*resPerPage)+resPerPage);

  useEffect(()=>{
    if(!inputValue) {setSearchResults([]); return;}

    const controller = new AbortController;

    search(controller.signal);
   
    return () => controller.abort();
  }, [inputValue]);

 

  const search = async (signal) => {
    try {

          setLoading(true);

          /** 1) Get all users */
          const allUsers = await getAllUsers(signal);
    
          /** Find users whose data(first_name) matches input value*/
          const usersMatchingInputValue = allUsers.filter(user=>user.first_name.includes(inputValue.split(' ')[0]) || user.last_name.includes(inputValue.split(' ')[1]));
       
          /** If there is users, set all of them, and display it */
          if(usersMatchingInputValue) setSearchResults([...usersMatchingInputValue]);
       
          setLoading(false);
    }catch(err){
      setLoading(false);
     
    };
  }


  return (
    <div style={{position:'relative'}}>
        <input
        style={forInput}
         placeholder='Search by names'
         value={inputValue}
         onChange={(e)=>setInputValue(e.target.value)}/>

         <div className='results' style={forResultsDIV}>

                {/**Loading spinner */}
                {loading && <BallTriangle />}

               {/** Results */}
               {usersResult && usersResult.map(item=><User user={item} displayButton={true} style={forUser} />)}

                


               <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={allPages}
                        onPageChange={({selected})=>setCurPage(selected)}

                        containerClassName={'search_paginate'}
                        previousLinkClassName={'perviousBtnCart'}
                        nextLinkClassName={'nextBtnCart'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                        pageClassName={'paginationCurPage'}
                    />
         </div>
    
    </div>
  )
}




// STYLE - CSS

const forResultsDIV = {
    borderRadius:'12px 12px 0 0',
    width:'100%',
    padding:'1em',
    position:'absolute',
    zIndex:'4',
    top:'3.9em',
    left:'0',
background: 'linear-gradient(to right, #00c6ff, #0072ff)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

const forInput = {
  border: '1px solid #5A76F8',
  padding:'0.9em',
  borderRadius:'14px',
  background:'#242222',
  color:'#fff',
  fontFamily:'Poppins, sans-serif',
  marginTop:'1em'
}


export const forUser = {
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  borderBottom:'1px solid #fff',
  paddingBottom:'0.5em',
  marginBottom:'10px'

}