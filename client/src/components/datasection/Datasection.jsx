import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState,useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import LazyLoadingImage from '../../lazyloadingimage/LazyLoadingImage';
import './Datasection.css'
import DatasectionLoadingSkeleton from '../loadingskeleton/DatasectionLoadingSkeleton';
import TextOverflow from '../textoverflow/TextOverflow';
function Datasection() {
    const { media_type,media_id } = useParams();
  const url = useSelector((state) => state.home.url);
  const {data,loading,error}=useFetch(`/${media_type}/${media_id}`);
  const[state,setState]=useState();
 
// <div id='detailoverview'   >{state?.overview}</div>
  useEffect(()=>{
    if(data && url && data?.length!==0){  
      console.log('data',data);
     setState(data) 
    }
  },[data,url])
  console.log('(media_type,movie_id',media_type,media_id)

  if(error){
    console.log(' if block error',error)
    return (<div>something went wrong.</div>)
  }
 
  if(loading||!state){
    console.log(' if block loading',loading)
    return (<div><DatasectionLoadingSkeleton/></div>)
  }
  return (
    <div id='datasection'>
    <div id='detailimage'      > 
  <LazyLoadingImage state={url+state?.backdrop_path}/>
    </div>
    <div id='detailtitle'      ><h2 style={{color:'#7644ff'}}>{state?.title} {state?.name}</h2></div>
    <div id='detailoverview'   ><TextOverflow text={state?.overview}/></div>
    <div id='detailtype'       >Type: <span>{media_type}</span></div>
    <div id='detailcountry'    >Country: <span>{state?.production_countries?.[0]?.name}</span></div>
    <div id='detailgenres'     >Genres:<span> {
      state?.genres?.map((genre,index)=>{
        return(
          <div key={index} id='genres'>{genre?.name}{(state?.genres?.length!==index+1)&&(<>,</>)}</div>
        )
      })
    }</span></div>
    <div id='detailreleasedate'>Releasedate: <span>{state?.release_date}{state?.first_air_date}</span></div>
    <div id='detailduration'   >Duration:<span> {state?.runtime} min</span></div>
    <div id='detailproducers'  >producer:<span></span></div>
    <div id='detaildirectors'  >director:<span></span></div>
    <div id='detailratings'    >Rating: <span>{state?.vote_average}/10 votecount({state?.vote_count})</span></div>
  </div>
  )
}

export default Datasection