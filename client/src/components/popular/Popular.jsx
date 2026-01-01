import React from 'react'
import LazyLoadingImage from '../../lazyloadingimage/LazyLoadingImage';
import { useSelector} from 'react-redux';
import { useState,useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import  { lazy, Suspense } from 'react';
import CardLoadingSkeleton from '../loadingskeleton/CardLoadingSkeleton';
//const Card=React.lazy(()=>import('../card/Card'))
import Card from '../card/Card';
import './Popular.css'
function Popular() {
    const[state,setState]=useState();
    const[page,setPage]=useState(Math.floor(Math.random()*500)==0?1:Math.floor(Math.random()*500));
    console.log(page);
    const {data,loading,error}=useFetch(`/movie/popular?page=${page}`);
    const url = useSelector((state) => state.home.url);
    let i=0;
  
            
    useEffect(()=>{
        if(data && url &&data?.length!==0){
          console.log('data',data);
          setState(data)
         
        }
      },[data,url])
      /*

          useEffect(()=>{
        if(data!==undefined&&data!==null&&data?.length!==0&&url!==undefined&&url!==null){
          console.log('data',data);
          const imageurl=url+data?.results?.[Math.floor(Math.random()*20)]?.poster_path;
          console.log('imageurl',imageurl);
          setState(imageurl)
        }
      },[data,url])
 
     
      <Suspense fallback={<div>Loading...</div>}>
        <Card state={state.results}/>
       </Suspense> 
      */

    if(error){
      return (<div>something went wrong.</div>)
    }
   if(loading||!state){
      console.log('state',state)
      return (<div><CardLoadingSkeleton/></div>)
    }
  return (<>
    <div>
    <h2>Popular</h2>
  </div>
        <Card state={state?.results}  horizontal={false}/>
   </>
  )
}

export default Popular