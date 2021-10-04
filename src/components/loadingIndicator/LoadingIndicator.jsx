import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
function LoadingIndicator() {
    return (
        <div className="loadingIndicator">
            <AiOutlineLoading3Quarters className="loadingIndicator__icon"/>
        </div>
    )
}

export default LoadingIndicator
