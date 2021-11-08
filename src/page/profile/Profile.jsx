import {axios} from '../../axios/axiosInstance'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileContent from './components/ProfileContent/ProfileContent'
import ProfileDetail from './components/ProfileDetail/ProfileDetail'
import { useParams } from 'react-router'
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
import VerticalDotBackGround from '../login/components/VerticalDotBackGround'
import BlueSpiralBackground from '../login/components/BlueSpiralBackground'
import HorizantalDotBackground from '../login/components/HorizantalDotBackground'
import ZigZagBackgroundComponent from '../login/components/ZigZagBackgroundComponent'
import BlueZigZagComponent from '../login/components/BlueZigZagComponent'
const Profile = () => {

    const {client} = useSelector(state => state.client)

    const [userDetails, setClientDetails] = useState(null)

    const { userId } = useParams()

    const [visitorIsUser, setVisitorIsUser] = useState(false)
    console.log('visitor is user: ',visitorIsUser);

    
    useEffect(() => {
        if(client && userId ){
            if(client.type.includes("user")){
                if(client.user.id === userId){
                    setVisitorIsUser(true)
                }
                else{
                    setVisitorIsUser(false)
                }
            }
        }
    }, [client, userId])


    useEffect(() => {
        if(userId){
            if(visitorIsUser){
                axios.get(`/user/detail/${userId}`,{
                headers:{
                    "role": "none",
                    "Authorization" : `bearer ${client.tokens.access.token}`
                }
                })
                .then( res =>{
                    setClientDetails(res.data)
                })
                .catch( err => {
                    alert(err)    
                })
            }
            else{
                axios.get(`/user/${userId}`,{
                headers:{
                    "role": "none"
                }
                })
                .then( res =>{
                    setClientDetails(res.data)
                })
                .catch( err => {
                    alert(err)
                })
            }
        }
    }, [client, userId])

    


    return (
        <div style = {{position: 'relative'}}>
            {
                userDetails ?
                <>
                    <ProfileContent user = {userDetails} setClientDetails = {setClientDetails} visitorIsUser = {visitorIsUser}/>
                    <ProfileDetail visitorIsUser = {visitorIsUser} user = {userDetails} userId = {userId}/>
                </>
                :
                    <LoadingIndicator />
            }

            <div className="user__profile__vertical-dots">
                <VerticalDotBackGround/>
            </div>
            <div className="user__profile__blue-spiral">
                <BlueSpiralBackground/>
            </div>
            <div className = 'user__profile__horizantal-dots'>
                <HorizantalDotBackground/>
            </div>
            <div className = 'user__profile__zig-zag-component'>
                <ZigZagBackgroundComponent/>
            </div>
            <div className = 'user__profile__blue-zig-zag-component'>
                <BlueZigZagComponent/>
            </div>
        </div>
    )
}

export default Profile
