import React from 'react'
import './TextOverflow.css'
import { useState,useEffect,useRef } from 'react'
function TextOverflow({text}) {
const [state,setState]=useState(false);
const ref=useRef();
//style={{WebkitLineClamp:state?'initial':'4'}}
useEffect(()=>{
    ref.current.scrollTop=0;
},[state])
  return (
    <div id='textoverflowcontainer'>
        <p id={state?'viewall':'viewless'} ref={ref}>
            {text}
        </p>
        <div id='view' onClick={()=>{setState(!state)}}>{state?'View less':'View All'}</div>
    </div>
  )
}

export default TextOverflow