import React, {useRef, useState}from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import { GiCogLock } from 'react-icons/gi'
import UpdateProfile from '../../../components/update_profile_button/UpdateProfile'
import PhoneInput from 'react-phone-number-input';
import Chart from '../../../components/charts/Chart';

const BrandDetail = ({item}) => {
    console.log("item update: ", item);

    const [option, setOption] = useState(1)


    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState(null)
    const address1 = useRef()
    const address2 = useRef()
    const address3 = useRef()

    const [updateProfile, setUpdateProfile] = useState(false)
    const [isLoadingUpdate, setIsloadingUpdate] = useState(false);

    const handleShowDashBoard = () => {
        setOption(1)
    }

    const handleShowReviews = () => {
        setOption(2)
    }

    const handleShowSettings = () => {
        setOption(3)
    }

    const handleShowReport = () => {
        setOption(4)
    }


    const handleUpdate = () => {
        setUpdateProfile(false)
        setIsloadingUpdate(true)

    }

    return (
        
            <div className = 'dashboard__list'>
                <ul>
                    <li onClick = {handleShowDashBoard} className = {option === 1 ? 'list__click': ''}>Dashboard</li>
                    <li onClick = {handleShowReviews} className = {option === 2 ? 'list__click': ''}>Reviews</li>
                    <li onClick = {handleShowSettings} className = {option === 3 ? 'list__click': ''}>Settings</li>
                    <li onClick = {handleShowReport} className = {option === 4 ? 'list__click': ''}>Reports</li>
                </ul>
                {
                    option === 1 && item ? 
                    (
                        <div className="dashboard__list__chart">
                            <Chart/>
                        </div>
                    ):
                    (
                        null
                    )
                }

                {
                    option === 3 && item ?    
                    (
                        <>
                        <div className="dashboard__list__settings">   

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Brand Name</h3>
                                    <h4>{item.name}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Category</h3>
                                    <h4>{item.name}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Email</h3>
                                    <h4>{item.email}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Phone</h3>
                                    <h4>{item.phoneNumber}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Country Code</h3>
                                    <h4>{item.phoneNumber.countryCode}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Address</h3>
                                    <h4>{item.name}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__name">
                                    <h3>Language</h3>
                                    <h4>{item.name}</h4>
                                </div>
                            </div>
                        </div>


                        <div className="dashboard__list__update-settings">
                            <UpdateProfile setUpdateProfile = {setUpdateProfile}/>
                        </div>

                        {
                            updateProfile ?
                            (
                                <>
                                <div className="mydetails__update-details">


                                    <div
                                        className="mydetails__update-details__mask"
                                        onClick={() => setUpdateProfile(false)}
                                    >
                                    </div>


                                    


                                    <div className="mydetails__update-details__update">
                                        

                                        <div className="mydetails__update-details__update__phone">
                                            <label htmlFor="phoneNumber">Phone Number </label>
                                                <PhoneInput
                                                    id = 'phoneNumber'
                                                    placeholder="Enter phone number"
                                                    value={phone}
                                                    className = 'mydetails__update-details__update__phone__phone-number'
                                                    name = 'phone number'
                                                    onChange={setPhone}/>   
                                        </div>


                                        <div className="mydetails__update-details__update__address">
                                            <label htmlFor="address">Address </label>
                                            <input
                                                id="address"
                                                placeholder="enter your address"
                                                onChange={(e) => address1.current = e.target.value}
                                                name="address"
                                            />
                                            <input
                                                id="addressLine1"
                                                placeholder="line 1"
                                                onChange={(e) => address2.current = e.target.value}
                                                name="address"
                                            />
                                            <input
                                                id="addressLine2"
                                                placeholder="line 2"
                                                onChange={(e) => address3.current = e.target.value}
                                                name="address"
                                            />
                                        </div>


                                        <div
                                        className="mydetails__update-details__update__button"
                                        onClick={() => {
                                            handleUpdate()
                                        }}
                                        >
                                            <h1>Ok</h1>
                                        </div>
                                    </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                null
                            )
                        }
                        </>
                    )
                    :
                    (
                        null
                    )
                }
                {
                    option === 2 ?
                    (<h1>option 2</h1>):(null)
                }
                {
                    option === 4 ? 
                    (<h1>option 4</h1>):(null)
                }

                
            </div>
    )
}

export default BrandDetail
