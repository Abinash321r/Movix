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
import { useInView } from 'react-intersection-observer';
function HeroBanner() {
    const[state,setState]=useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const[count,setCount]=useState(0);
    const[page,setPage]=useState(Math.floor(Math.random()*500)==0?1:Math.floor(Math.random()*500));
    const navigate=useNavigate();
    const ref=useRef();
    const [reference, inView] = useInView()
    const {data,loading,error}=useFetch(`/trending/all/week?page=${page}`);
    const url = useSelector((state) => state.home.url);
    const setref=(node)=>{
    ref.current=node;
    reference(node);
    }
    const startinterval=()=>{/*
      clearInterval(intervalId);
      const interval=setInterval(()=>{
         setCount((prevCount)=>prevCount+1)
   },10000)
   setIntervalId(interval);
   */
  }
        
  const handleclick=(media_type,id)=>{
 navigate(`/details/${media_type}/${id}`)
 }

 const handleleft=()=>{
  if(count==0){
    setCount(0)
  }
  else{
    setCount(count-1)
  }
   startinterval();
 }

 const handleright=()=>{
  setCount(count+1)
    startinterval();
 }

    useEffect(()=>{
        if(data && url && data?.length!==0){
         const array= data?.results
           setState([...state,...array])
        }
      },[data])

     useEffect(()=>{ 
      startinterval();
       return () =>{
         clearInterval(intervalId);
        }
       },[])

      useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible'&&inView==true) {
         
            startinterval();
          } else {
         
            clearInterval(intervalId);
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          clearInterval(intervalId);
        };
      }, [intervalId]);

      useEffect(()=>{
    
        if(inView==false){
        clearInterval(intervalId)

        }
        else{
          startinterval();
        }
       },[inView])

       useEffect(()=>{
        const container=ref?.current;
          if(ref?.current){
            container.scrollTo({
              left: container?.clientWidth*count,
              behavior: 'smooth',  // Add smooth scrolling behavior
            });
            }
            if(container?.scrollWidth-(container?.scrollLeft+container?.clientWidth)<2*container?.clientWidth){
              setPage(Math.floor(Math.random()*500)==0?1:Math.floor(Math.random()*500))
            }  
        },[count])

    
    if(error){
      return (<div>something went wrong.</div>)
    }
    if(!state||state.length==0){
      return (<div><HeroBannerLoadingSkeleton/></div>)
    }
  return (
    //style={{overflow:'hidden'}} 
 
    <div id='herobannercontainer' ref={setref}  style={{overflow:'hidden'}}   >
    {state?.map((state,index)=>{
      return(
    <div id='herobanner'    key={index}  >
        <>
        <div id='img'   onClick={()=>handleclick(state?.media_type,state?.id)}>
        <LazyLoadingImage state={url+state?.backdrop_path}/>
        </div>
        <div id='titleofherobanner'>
          <h3>{state?.title}{state?.name}</h3>
          </div>
        <div id='ratings'>
          <div>{state?.vote_average?.toFixed(2)}</div>
          <div>{state?.media_type}</div>
          <div>{state?.release_date}{state?.first_air_date}</div>
        </div>
        <div id='description'>
          <p id='paragraph'>{state?.overview}</p>
          </div>
        <div id='watchnow'>
          <div id='watchnowtext'  onClick={()=>handleclick(state?.media_type,state?.id)}>watchnow</div>
          <div id='watchnowarrow'>
            <div onClick={()=>handleleft()}> <KeyboardArrowLeftIcon/></div>
            <div onClick={()=>handleright()}> <KeyboardArrowRightIcon/></div>
          </div>
       </div>
        </>
    </div>
  )})}
    </div>
  )
}

export default HeroBanner