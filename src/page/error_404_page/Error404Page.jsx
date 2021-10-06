import React from 'react'
import ErrorPage from '../../assests/images/404-error-page-templates 1.png'
const Error404Page = () => {
    return (
        <div className = 'error__page'>
            <img src = {ErrorPage} alt = 'Error 404 (No page Found)'/>
        </div>
    )
}

export default Error404Page
