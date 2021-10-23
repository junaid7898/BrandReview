import React, { useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
const EmailVerificationPage = () => {

    const {token} = useParams()

    useEffect(() =>{
        const fetcher = async(token) => {
            await axios.post(`http://localhost:4000/v1/auth/verify-email?token=${token}`)
        }
        if(token){
           fetcher(token) 
        }
    },[token])

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
