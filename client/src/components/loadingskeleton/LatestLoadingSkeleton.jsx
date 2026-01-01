import React from 'react'

function LatestLoadingSkeleton() {
    const array= new Array(12).fill(0);
  return (
    <div>
    <div>
        <h2 style={{height:'47px',width:'100%'}}></h2>
    </div>
    <div id="latest">
        {
            array.map((iter,i)=>(
                <div key={i} id='container' className='skeleton' style={{height:'155px'}}></div>
            ))
        }
    </div>
    </div>
  )
}

export default LatestLoadingSkeleton