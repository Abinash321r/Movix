import React from 'react'
import './CardLoadingSkeleton.css'
function CardLoadingSkeleton() {
    const array=new Array(20).fill(0);

  return (<>
   <div>
        <h2 style={{height:'27px',width:'100%'}}></h2>
    </div>
    <div id='cardcontainer' >
      {array.map((iter,i)=>(
         <div key={i} id='card'  style={{border:'transparent'}}>
            <div id='static'  className='skeleton' style={{backgroundColor:'#092955'}}>
            </div>
             </div> 
      ))}
    </div>
    </>
  )
}

export default CardLoadingSkeleton