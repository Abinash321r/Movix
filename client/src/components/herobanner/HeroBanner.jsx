import React from 'react'
import './HeroBanner.css'
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyLoadingImage from '../../lazyloadingimage/LazyLoadingImage';
import HeroBannerLoadingSkeleton from '../loadingskeleton/HeroBannerLoadingSkeleton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function HeroBanner() {
    const[state,setState]=useState([]);

    const[page,setPage]=useState(Math.floor(Math.random()*500)==0?1:Math.floor(Math.random()*500));
    const navigate=useNavigate();
    const {data,loading,error}=useFetch(`/trending/all/week?page=${page}`);
    const url = useSelector((state) => state.home.url);
    const containerRef = useRef(null);
    const timeoutRef = useRef(null);
        
  const handleclick=(media_type,id)=>{
 navigate(`/details/${media_type}/${id}`)
 }

 

    useEffect(()=>{
        if(data && url && data?.length!==0){
         const array= data?.results
           setState([...state,...array])
        }
      },[data])

  
  const scrollLeft = () => {
  if (!containerRef.current) return;
  containerRef.current.scrollBy({
    left: containerRef.current.clientWidth,
    behavior: "smooth",
  });
};
 const scrollRight = () => {
  if (!containerRef.current) return;
  containerRef.current.scrollBy({
    left: -containerRef.current.clientWidth,
    behavior: "smooth",
  });
};


       useEffect(()=>{
  // start auto-scroll after 10s
  timeoutRef.current = setTimeout(() => {
    console.log('10s timeout called')
    scrollLeft();
  }, 10000);

  const container = containerRef?.current;
  const onScroll = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log('10s timeout called from scroll')
      scrollLeft();
    }, 10000);
  };
  container?.addEventListener("scroll", onScroll, { passive: true });


  return () => {
    container?.removeEventListener("scroll", onScroll);
    clearTimeout(timeoutRef.current);
  };
        },[[state.length]])

    
    if(error){
      return (<div>something went wrong.</div>)
    }
    if(!state||state.length==0){
      return (<div><HeroBannerLoadingSkeleton/></div>)
    }
  return (
    //style={{overflow:'hidden'}} 
 
    <div id='herobannercontainer'   ref={containerRef} style={{ overflowX: 'auto', overflowY: 'hidden' }} >
    {state?.map((state,index)=>{
      return(
    <div id='herobanner'    key={index}  >
        <>
        <div id='img'   onClick={()=>handleclick(state?.media_type,state?.id)}>
        <LazyLoadingImage state={url+state?.backdrop_path}/>
        </div>
        <div id='titleofherobanner'>
          {(state?.title||state?.name)?<h3>{state?.title}{state?.name}</h3>:<h3>Not Available</h3>}
          </div>
        <div id='ratings'>
          {(state?.vote_average>0)&&(<div>{state?.vote_average?.toFixed(2)}</div>)}
          {(state?.media_type)&&(<div>{state?.media_type}</div>)}
          {(state?.release_date || state?.first_air_date)&&(<div>{(state?.release_date || state?.first_air_date)?.split("-")[0]}</div>)}
        </div>
        <div id='description'>
          {(state?.overview)?(<p id='paragraph'>{state?.overview}</p>):(<p id='paragraph'>Description not avilable</p>)}
          </div>
        <div id='watchnow'>
          <div id='watchnowtext'  onClick={()=>handleclick(state?.media_type,state?.id)}>watchnow</div>
          <div id='watchnowarrow'>
            <div onClick={()=>scrollRight()}> <KeyboardArrowLeftIcon/></div>
            <div onClick={()=>scrollLeft()}> <KeyboardArrowRightIcon/></div>
          </div>
       </div>
        </>
    </div>
  )})}
    </div>
  )
}

export default HeroBanner