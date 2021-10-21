import React, { useState } from 'react'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

const Image = (props) => {
    const [imageIsLoading, setImageIsLoading] = useState(true)
    return (
        <div {...props} style = {{position: 'relative'}}>
            <img src = {imageSrc} className = {imageStyle} onLoad = {() => setImageIsLoading(false)}/>
            {
                imageIsLoading && 
                <LoadingIndicator/>
            }
        </div>
    )
}

export default Image
