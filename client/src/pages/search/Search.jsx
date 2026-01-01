import React from 'react'
import './Search.css'
import { useParams } from 'react-router-dom'
import Card from '../../components/card/Card';
import useFetch from '../../hooks/useFetch';
import { useState,useEffect } from 'react';
import CardLoadingSkeleton from '../../components/loadingskeleton/CardLoadingSkeleton';
import { useSelector,useDispatch } from 'react-redux';
import {getScrollTop} from '../../store/homeslice';
import { BeatLoader } from 'react-spinners';
function Search() {
    const {query}=useParams();
    const[queries,setQueries]=useState(query);
    const[page,setPage]=useState(1);
    const[state,setState]=useState([]);
    const [noresults,setNoResults]=useState(false);
    const {data,loading,error}=useFetch(`/search/multi?query=${queries}&page=${page}`)
    const fetchmore = useSelector((state) => state?.home?.scrollstate);
    const dispatch=useDispatch();

    useEffect(()=>{
      if(fetchmore&&data){
          console.log('fetchmore from useffect',fetchmore);
          if(page<data?.total_pages){
          setPage(page+1)
          }
      }
  },[fetchmore])

    useEffect(()=>{ 
      console.log('i am called from useffect')
            if(data&&data?.length!==0){
                console.log('search data',data);
                if(data?.results?.length==0){
                  setNoResults(true)
                } 
                  else{
                       setState([...state,...data?.results])
                        setNoResults(false)
                  }       
        }
      },[data])

      useEffect(()=>{
        if(query){
          setQueries(query)
          setPage(1);
          setState([]);
          dispatch(getScrollTop(true))
        }  
      },[query])
    

    if(error){
        return(<div>something went wrong...</div>)
    }
    if(noresults){
        return(<div>Search results not found</div>)
    }
    if((loading&&page==1)||!state||state.length==0){
      console.log('loading page state',loading,page,state)
        return(<div>
          <CardLoadingSkeleton/></div>)
    }
   
  return (
   <div id='search'>
    {console.log("search totalpages,pages",data?.total_pages,page)}
    <div id='searchtitle'>
        <h2 style={{color:'#7644ff'}}>
            {query}
        </h2>
    </div>
  
   <div id='infinitescroll'>
   <Card state={state} horizontal={false}/>
   </div>
   {
((loading&&page!==0))&&(
  <div id='spinner'> <BeatLoader color="#7644ff" size={30} /></div>
)
   }
    </div>
   
  )
}

export default Search