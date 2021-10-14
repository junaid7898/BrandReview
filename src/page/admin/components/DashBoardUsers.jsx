
import React, {useState} from 'react'
import ProfileImg from '../../../assests/images/Profile Image.png'
import ImageViewer from '../../../components/image_viewer/ImageViewer'

const DashBoardUsers = () => {
    const [showImage, setShowImage] = useState(null)
    const users = [{
        name: 'Brad',
        profileImage: ProfileImg,
        address: 'xxxxxx xxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxx xxxxxx',
        phoneNumber: '03118888888',
        email: 'junaidabbasi@gmail.com',
        countryCode: '+92'
    },
    {
        name: 'Brad',
        profileImage: ProfileImg,
        address: 'xxxxxx ',
        phoneNumber: '03118888888',
        email: 'junaidabbasi@gmail.com',
        countryCode: '+92'
    },
    {
        name: 'Brad',
        profileImage: ProfileImg,
        address: 'xxxxxx xxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxx xxxxxx',
        phoneNumber: '03118888888',
        email: 'junaidabbasi@gmail.com',
        countryCode: '+92'
    },
    {
        name: 'Brad',
        profileImage: ProfileImg,
        address: 'xxxxxx xxxxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxx xxxxxx',
        phoneNumber: '03118888888',
        email: 'junaidabbasi@gmail.com',
        countryCode: '+92'
    }
]
    return (
        <div className="dashboard__users__data">
            {
                users.map(
                    user => (
                        <div className="dashboard__users__data__user">

                            <div className="dashboard__users__data__user__intro">
                                <img src = {user.profileImage} onClick = {() => {setShowImage(user.profileImage)}}/>
                                <h5>{user.name}</h5>
                            </div>

                            <div className="dashboard__users__data__user__details">

                                <div className="dashboard__users__data__user__details__phone">
                                    <label>Phone</label>
                                    <p>{user.phoneNumber}</p>
                                </div>

                                <div className="dashboard__users__data__user__details__email">
                                    <label>Email</label>
                                    <p>{user.email}</p>
                                </div>

                                <div className="dashboard__users__data__user__details__address">
                                    <label>Address</label>
                                    <p>{user.address}</p>
                                </div>

                                <div className="dashboard__users__data__user__details__country-code">
                                    <label>Country code</label>
                                    <p>{user.countryCode}</p>
                                </div>

                            </div>
                            {showImage ? ( <ImageViewer image = {showImage} setImage = {setShowImage}/> ) : ( null ) }
                        </div>
                    )
                )
            }
        </div>
    )
}

export default DashBoardUsers
