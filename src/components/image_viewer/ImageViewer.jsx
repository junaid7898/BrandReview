import React from 'react'
import { GrClose } from "react-icons/gr";
function ImageViewer({image, setOnClickImage}) {
    console.log(image)
    return (
        <div className="imageViewer">
            <div className="imageViewer__mask" onClick={() => setOnClickImage(false)}/>
            <div className="imageViewer__close" >
            <GrClose
                size={24}
                className= "imageViewer__close__icon" 
                onClick={() => setOnClickImage(false)}
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
