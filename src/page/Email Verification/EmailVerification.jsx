import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
function EmailVerification() {

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
        <div>
            \emailveerification
        </div>
    )
}

export default EmailVerification
