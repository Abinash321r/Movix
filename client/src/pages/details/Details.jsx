import React from 'react'
import './Details.css'
import VideoPlayerComponent from '../../components/videoplayer/VideoPlayerComponent';
import Datasection from '../../components/datasection/Datasection';
import CardLoadingSkeleton from '../../components/loadingskeleton/CardLoadingSkeleton';
function Details() {
  return (
   <div id='details'>
    <div id='detailsleft'>
   <VideoPlayerComponent/>
  
    </div>
    <div id='detailsright'>
   <Datasection/>
    </div>
    
  </div>
  )
}

export default Details