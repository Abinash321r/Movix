import React from 'react'
import './Home.css';
import HeroBanner from '../../components/herobanner/HeroBanner';
import Popular from '../../components/popular/Popular';
import Latest from '../../components/latest/Latest';
function Home() {
  return (
 <div id='home'>
  <div id="left">
   <HeroBanner/>
   <Popular/>
  </div>
   <Latest/>
</div>
  )
}

export default Home