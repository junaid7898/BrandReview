import React from 'react'

const ImageThumbnail = ({image}) => {
    return (
        <div className="image__thumbnail">
            <img src={image} alt="thumb" className="image__thumbnail__image" />
        </div>
    )
}

export default ImageThumbnail
