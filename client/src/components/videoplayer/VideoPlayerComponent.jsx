
import React, { Suspense, lazy } from 'react';
const ReactPlayer = lazy(() => import('react-player/youtube'));
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState,useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import './VideoPlayerComponent.css'
import VideoPlayerLoadingSkeleton from '../loadingskeleton/VideoPlayerLoadingSkeleton';
function VideoPlayerComponent() {
 // console.log(`https://www.youtube.com/watch?v=${vstate}`)
 const { media_type,media_id } = useParams();
  const {data:vdata,loading:vloading,error:verror}=useFetch(`/${media_type}/${media_id}/videos`);
  const[vstate,setVstate]=useState();
  const[episode,setEpisode]=useState();
  const handleclick=(index)=>{
    console.log('episode',index)
    setEpisode(vdata?.results?.[index]?.key)
      }

      useEffect(()=>{
        if(vdata && vdata?.length!==0){
         console.log('length',vdata?.length)
          console.log('vdata',vdata);
         if(vdata?.results?.length!==0){
           const episode= vdata?.results?.[0]?.key
           setEpisode(episode)
           setVstate(vdata?.results) 
         }
         else{
          console.log('empty array setting else block')
           setVstate([])
           setEpisode([])
         }
        }
      },[vdata])
      console.log('(media_type,movie_id',media_type,media_id)
      if(verror){
        console.log(' if block error',verror)
        return (<div>something went wrong.</div>)
      }
     
      if(vloading||!vstate||!episode){
        console.log('vstate',vstate)
        console.log(' if block loading',vloading)
        return (<div><VideoPlayerLoadingSkeleton/></div>)
      }
      console.log('vatate',episode)
  return (

    <div id='videosection'>
      {console.log(`https://www.youtube.com/watch?v=${episode}`)}
    {(vstate.length!==0&&episode.length!==0)?
      <div id='videoplayer'>
              <Suspense fallback={<div>Loading...</div>}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${episode}`}
          controls
          playing={true}
          width="100%"
          height="400px"
        />
      </Suspense>
         
  <div id='episodes'>
  {
      vstate?.map((video,index)=>{
        return(
          <div key={index} id='video' onClick={()=>handleclick(index)}>{index+1} </div>
        )
      })
    }
  </div>
  </div>
  :
  <div>video not available</div>
  }
</div>
  )
}

export default VideoPlayerComponent