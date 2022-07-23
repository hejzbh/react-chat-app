import React from 'react'

export const UserIntroduction = ({name, value}) => (
    <div className='data_info' style={{textAlign:'center'}
    }>
        <h4 className='name' style={forDataName}>{name}</h4>
        <h3 className='value' style={forDataValue}>{value}</h3>
  
    </div>
)
  
  


// Style 
const forDataName = {
    color:'#9CB1D8',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '16px',
    marginBottom:'15px'
  }
  
  const forDataValue = {
    color:'#3B516E',
    fontSize:'18px',
    fontWeight:'700',
    lineHeight:'16px'
  }
