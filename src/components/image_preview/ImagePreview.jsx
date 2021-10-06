import React from 'react'
import { GrClose } from "react-icons/gr";
function ImagePreview({image, index, removeImage}) {
    return (
        <div className="imagePreview">
            <GrClose className="imagePreview__close" size={24} onClick={() => removeImage(index)}/>
            <img className="imagePreview__image" src={image} alt="logo" />
        </div>
    )
}

export default ImagePreview
