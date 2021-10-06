import React from 'react'
import { Link } from 'react-router-dom'

const EmailVerificationPage = () => {
    return (
        <div className="email__verification">
            <div className="email__verification__text">
                <h1>Your Email has been Verified......</h1>
            </div>
            <Link to = '/' className = 'email__verification__button'>
                <h3>Continue</h3>
            </Link>
        </div>
    )
}

export default EmailVerificationPage
