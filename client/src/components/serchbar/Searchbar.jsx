import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {getScrollTop} from '../../store/homeslice';
import './Searchbar.css'
function Searchbar() {
  const [state,setState]=useState();
  const navigate=useNavigate();
  const dispatch=useDispatch();
const handlechange=(e)=>{
 // console.log('onchange',e.target.value)
setState(e.target.value)
}

const handlenavigate=(e)=>{
  if(e.key==='Enter'&& state){
    dispatch(getScrollTop(true));
    navigate(`/search/${state}`)
  }
}
const handlenavigateonclick=()=>{
  if(state){
    dispatch(getScrollTop(true));
    navigate(`/search/${state}`)
  }
}

  return (
 <div id='input'>
    <input onChange={(e)=>{handlechange(e)}} onKeyDown={(e)=>{handlenavigate(e)}} placeholder='Search Movie/Tv...'></input>
    <div id='floatsearch'onClick={handlenavigateonclick} >search</div>
 </div>
  )
}

export default Searchbar