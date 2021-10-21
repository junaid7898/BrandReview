import React, { useState } from 'react'
import LoadingIndicator from "../loadingIndicator/LoadingIndicator"
const ImageThumbnail = ({image}) => {
    const [isImageLoading, setIsImageLoading] = useState(true)
    return (
        <div className="image__thumbnail">
            <img onLoad={() => setIsImageLoading(false)} src={image} alt="thumb" className="image__thumbnail__image" />
            {
                isImageLoading &&
                <LoadingIndicator />
            }
        </div>
    )
}

export default ImageThumbnail
