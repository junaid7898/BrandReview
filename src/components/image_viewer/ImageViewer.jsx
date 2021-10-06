import React, { useEffect } from 'react'
import { GrClose } from "react-icons/gr";
function ImageViewer({image, setImage}) {
    console.log(image)
    return (
        <div className="imageViewer">
            <div className="imageViewer__mask" onClick={() => setImage(null)}/>
            <div className="imageViewer__close" onClick={() => setImage(null)}>
            <GrClose
                size={24}
                className= "imageViewer__close__icon" 
            />
            </div>
            <img
            src={image}
            className="imageViewer__image"
            alt = 'brand'
            />
        </div>
    )
}

export default ImageViewer
