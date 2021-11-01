import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
function ImageViewer({image, setImage}) {
    console.log(image)
    return (
        <div className="imageViewer">
            <div className="imageViewer__mask" onClick={() => setImage(null)}/>
            <div className="imageViewer__close" onClick={() => setImage(null)}>
            <AiOutlineClose
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
