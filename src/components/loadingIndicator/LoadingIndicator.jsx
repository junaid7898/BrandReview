import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
function LoadingIndicator(props) {
    return (
        <div className="loadingIndicator" {...props} style={{color: "rgb(22, 176, 236)"}} >
            <AiOutlineLoading3Quarters className="loadingIndicator__icon"/>
        </div>
    )
}

export default LoadingIndicator
