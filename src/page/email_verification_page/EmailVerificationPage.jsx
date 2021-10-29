import React, { useEffect, useRef }  from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import {axios} from '../../axios/axiosInstance'
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
                console.log("req sent for user===============")
                axios.post(`/auth/user/verify-email?token=${token}`)
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
                console.log("req sent for brand===============")
                axios.post(`/auth/brand/verify-email?token=${token}`)
                .then(({data}) =>{
                    console.log(data)
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
        if(token && type && !reqSent.current){
            reqSent.current = true
           fetcher(token, type) 
        }
        console.log(token)
        console.log(type)
        console.log("Request Sent: " + reqSent.current)
    },[token, type])

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
