import React from 'react'
import { useState } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholderimg from '../assets/neom-gVDUuJaG_wM-unsplash (3).jpg'
import './LazyLoadingImage.css'
function LazyLoadingImage({state}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
   <>
     {isLoading && (
        <img
          src={placeholderimg}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      )}
      <img
        src={state}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s"
        }}
      />
   </>
  )
}

export default LazyLoadingImage