import React from 'react'
import { GrClose } from "react-icons/gr";
function ImagePreview({image, removeImage}) {
    return (
        <div className="imagePreview">
            <GrClose className="imagePreview__close" size={24}/>
            <img className="imagePreview__image" src="https://i2.wp.com/blog.viral-launch.com/wp-content/uploads/2018/08/2000px-Apple_logo_black.svg_.png?fit=2000%2C2000&ssl=1" alt="logo" />
        </div>
    )
}

export default ImagePreview
