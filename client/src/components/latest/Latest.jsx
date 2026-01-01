import React, { usedatas } from 'react'
import './Latest.css'
import useFetch from '../../hooks/useFetch'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyLoadingImage from '../../lazyloadingimage/LazyLoadingImage';
import { useSelector } from 'react-redux';
import LatestLoadingSkeleton from '../loadingskeleton/LatestLoadingSkeleton';
function Latest() {
  const [datas,setdatas]=useState();
  const[page,setPage]=useState(Math.floor(Math.random()*10)==0?1:Math.floor(Math.random()*10));
 const url = useSelector((state) => state.home.url);
  const {data,loading,error}=useFetch(`/tv/airing_today?page=${page}`)
  const navigate=useNavigate();
  console.log('data loading error',data,loading,error)

  const handleclick=(id)=>{
    // const movie='movie'
     console.log(' id',id)
 navigate(`/details/tv/${id}`)
 }

  useEffect(()=>{
if(data && data?.length!==0){
  console.log('data from useffect',data?.results)
  setdatas(data?.results?.slice?.(0,12)?.slice?.(0,14))
}
  },[data])

  if(error){
    return(<div>something went wrong...</div>)
  }
  if(loading||!datas ){
    return(<div><LatestLoadingSkeleton/></div>)
  }
  return (
    <div>
    {
    console.log('url',url)}
      <div>
      <h2 style={{padding:'10px'}}>Airing</h2>
      </div>
    <div id='latest'>
  
      {
datas?.map((value,index)=>{
  return(
 
   
<div id='container'key={index} onClick={()=>handleclick(value?.id)} >
{(value?.poster_path)&&(<>
  <div id='imge'>
  <LazyLoadingImage state={url+value?.poster_path}/>
  </div>
  <div id='name'>
  {value?.title}{value?.name}
  </div>
  <div id='ratingsdiv'>
 <div id='ratingvalue'>{value?.vote_average}</div>
 <div>tv</div>
  <div id='releasedate'>{value?.release_date}{value?.first_air_date}</div>
  </div>
  </>
    )
  }
 </div>

  )
})
    }

</div>
    </div>
    )
}

export default Latest