import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileContent from './components/ProfileContent/ProfileContent'
import ProfileDetail from './components/ProfileDetail/ProfileDetail'
import { useParams } from 'react-router'
const Profile = () => {

    const {user} = useSelector(state => state.user)

    const [userDetails, setUserDetails] = useState(null)

    const { userId } = useParams()

    const [currentUser, setCurrentUser] = useState(false)

    

    useEffect(() => {

        if(userId){
            axios.get(`http://localhost:4000/v1/user/detail/${userId}`)
            .then( res =>{
                setUserDetails(res.data)
            })
            .catch( err => {
                alert(err)
            })
        }

        if(user && userId){

            if(userId === user.user.id){
                setCurrentUser(true)
            }
        }
    }, [user, userId])


    return (
        <div >
            <ProfileContent user = {userDetails} setUser = {setUserDetails}/>
            {
                currentUser
                ?
                    <ProfileDetail user = {userDetails}/>
                :
                    null
            }
        </div>
    )
}

export default Profile
