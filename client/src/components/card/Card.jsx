import React from 'react'
import './Card.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import LazyLoadingImage from '../../lazyloadingimage/LazyLoadingImage';
function Card({state,horizontal}) {
    const [mobile,setMobile]=useState(false)
    const [mobilemapping,setMobileMapping]=useState(state)
    const navigate = useNavigate();
    console.log(state)
    const url = useSelector((state) => state?.home?.url);

const handleclick=(id)=>{
   // const movie='movie'
    console.log('id',id)
navigate(`/details/movie/${id}`)
}

useEffect(()=>{
if(state){
    console.log(state)
setMobileMapping(state)
}
},[state])


useEffect(()=>{
    if(window.innerWidth<=450){
       // setMobile(true)
       console.log('state',state)
       console.log('mobile mapping',mobilemapping)
       setMobileMapping(mobilemapping?.slice(0,8))
    }
    else{
        setMobileMapping(mobilemapping)  
    }
 const   hadlescroll=()=>{
if(window.innerWidth<=450){
   // setMobile(true)
    setMobileMapping(mobilemapping?.slice(0,8))
}
else{
    setMobileMapping(mobilemapping)  
}
    }

    window.addEventListener('resize',hadlescroll)

    return()=>{
       window.removeEventListener('resize',hadlescroll)

    }
},[])

  return (<>
    <div id={horizontal?'cardcontainerhorizontal':'cardcontainer'}>
       {console.log('mobilemapping',mobilemapping)}
{

    mobilemapping?.map((data,index)=>{
        return(
          
            <div id='card' key={index} onClick={()=>handleclick(data?.id)}>
            <div id='static'>
                <div  id='image' ><LazyLoadingImage state={url+data?.poster_path}/></div>
                <div id='title' > {data?.title}{data?.name}</div>
                <div id='date' >{data?.release_date}{data?.first_air_date}</div>
            </div>
            <div id='float'>
                <div id='rating'>{data?.vote_average?.toFixed(2)}</div>
                <div id='merginglayer'></div>
            </div>
        </div>
     
        )
    })
}
   
</div>
    </>
  )
}

export default Card