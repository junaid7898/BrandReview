import React from 'react'

const UpdateProfile = ({ value, ...rest} ) => {
    
    return (
        <div className="update__profile" {...rest}>
            <div className="update__profile__button" >
                <p>{value}</p>
            </div>
        </div>
    )
}

export default UpdateProfile
