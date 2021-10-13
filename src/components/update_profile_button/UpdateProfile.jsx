import React from 'react'

const UpdateProfile = ({setUpdateProfile}) => {
    
    return (
        <div className="update__profile">
            <div className="update__profile__button" onClick = {() => setUpdateProfile(true)}>
                <p>Update Profile</p>
            </div>
        </div>
    )
}

export default UpdateProfile
