import React, { useEffect, useRef }  from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import {axios} from '../../axios/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { clientActions } from '../../Redux/clientslice/clientSlice'
import RegistrationPageComponent from '../../components/registration_page_component/RegistrationPageComponent'
import VerticalDotBackGround from '../login/components/VerticalDotBackGround'
import ZigZagBackgroundComponent from '../login/components/ZigZagBackgroundComponent'
import BlueZigZagComponent from '../login/components/BlueZigZagComponent'
import BlueSpiralBackground from '../login/components/BlueSpiralBackground'
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
            <div className = 'email__verification__left-container'>
                <div className="email__verification__left-container__text">
                    <h1>Congratulations you are sign up</h1>
                </div>
                <Link  to = '/'>
                    <button className = 'email__verification__left-container__link'>
                        Continue
                    </button>
                </Link>
            </div>
            <div className = 'email__verification__right-container'>
                <RegistrationPageComponent/>
            </div>

            <div className = 'email__verification__vertical-dot'>
                <VerticalDotBackGround/>
            </div>
            <div className = 'email__verification__vertical-dot2'>
                <VerticalDotBackGround/>
            </div>
            <div className = 'email__verification__yellow-zigzag'>
                <ZigZagBackgroundComponent/>
            </div>
            <div className = 'email__verification__blue-zigzag'>
                <BlueZigZagComponent/>
            </div>
            <div className = 'email__verification__blue-spiral'>
                <BlueSpiralBackground/>
            </div>

        </div>
    )
}

export default EmailVerificationPage