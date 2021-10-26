import React, { useEffect, useRef }  from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clientActions } from '../../Redux/clientslice/clientSlice'
const EmailVerificationPage = () => {
    const {client} = useSelector(state => state.client)
    const dispatch = useDispatch()
    const {token} = useParams()
    const {type} = useParams()
    const reqSent = useRef(false)
    useEffect(() =>{
        console.log("Request Sent: " + reqSent.current)
        const fetcher = async(token, type) => {
            if(type === "user"){
                axios.post(`http://localhost:4000/v1/auth/user/verify-email?token=${token}`)
                .then(({data}) =>{
                    if(client){
                        dispatch(clientActions.setClient({
                            ...client,
                            user: data
                        }))
                    }
                })
                .catch(err =>{
                    console.log(err)
                })
            }
            else if(type === "brand"){
                axios.post(`http://localhost:4000/v1/auth/brand/verify-email?token=${token}`)
                .then(({data}) =>{
                    if(client){
                        dispatch(clientActions.setClient({
                            ...client,
                            brand: data
                        }))
                    }
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        }
        if(token && !reqSent.current){
            reqSent.current = true
           fetcher(token) 
        }
        console.log(token)
        console.log("Request Sent: " + reqSent.current)
    },[])

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
