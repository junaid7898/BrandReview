import React from 'react'
import ErrorPage from '../../assests/images/404-error-page-templates 1.png'
const Error404Page = () => {
    return (
        <div className = 'error__page'>
            <p className = 'error__page__header'>Oops!</p>
            <p className = 'error__page__404'>
                404 - page not found
            </p>
            <p className = 'error__page__footer'>
                The page you are looking for might have been removed had it's name changed or is temporary unavailable
            </p>
        </div>
    )
}

export default Error404Page
