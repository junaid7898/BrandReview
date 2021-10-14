import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileContent from './components/ProfileContent/ProfileContent'
import ProfileDetail from './components/ProfileDetail/ProfileDetail'
import { useParams } from 'react-router'
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
const Profile = () => {

    const {client} = useSelector(state => state.client)

    const [userDetails, setClientDetails] = useState(null)

    const { userId } = useParams()

    const [visitorIsUser, setVisitorIsUser] = useState(false)

    
    useEffect(() => {
        if(client && userId && client.user.id === userId){
            setVisitorIsUser(true)
        }
        else{
            setVisitorIsUser(false)
        }
    }, [client, userId])


    useEffect(() => {

        if(userId){
            if(visitorIsUser){
                axios.get(`http://localhost:4000/v1/user/detail/${userId}`,{
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
                axios.get(`http://localhost:4000/v1/user/${userId}`,{
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
        <div >
            {
                userDetails ?
                <>
                    <ProfileContent user = {userDetails} setClient = {setClientDetails}/>
                    <ProfileDetail visitorIsUser = {visitorIsUser} user = {userDetails}/>
                </>
                :
                    <LoadingIndicator />
            }
        </div>
    )
}

export default Profile
