import React, {useRef, useState}from 'react'
import UpdateProfile from '../../../components/update_profile_button/UpdateProfile'
import PhoneInput from 'react-phone-number-input';
import Chart from '../../../components/charts/Chart';
import {ImCross} from 'react-icons/im';
import { axios } from '../../../axios/axiosInstance';
import BrandReviews from './BrandReviews';

const BrandDetail = ({item, brandId}) => {
    console.log("item update: ", item);   

    const [option, setOption] = useState(1)


    const [phone, setPhone] = useState(item.countryCode+item.phoneNumber)
    const [about, setAbout] = useState(item.about)

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
        setUpdateProfile(!updateProfile)
        setIsloadingUpdate(true)

    }


    return (
        
            <div className = 'dashboard__list'>
                <ul>
                    <li onClick = {handleShowDashBoard} className = {option === 1 ? 'list__click': ''}>Dashboard</li>
                    <li onClick = {handleShowReviews} className = {option === 2 ? 'list__click': ''}>Reports</li>
                    <li onClick = {handleShowSettings} className = {option === 3 ? 'list__click': ''}>Settings</li>
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
                                    <h4>{item.countryCode + item.phoneNumber}</h4>
                                </div>
                            </div>

                        </div>


                        <div className="mydetails__update-button">
                            <div className="mydetails__update-button__button1">
                                <UpdateProfile onClick={() => setUpdateProfile(true)} value = 'Update Profile' />
                            </div>
                        {
                            item.isPhoneVerified ?
                            null
                            :
                            <div className="mydetails__update-button__button2" style = {{position: 'relative'}}>
                                {
                                <UpdateProfile onClick = {() => console.log('hello')} value = 'Verify Phone'/>
                                }
                            </div>
                            
                        }
                        

                        </div>

                        {
                            updateProfile ?
                            (
                                <>
                                <div className="mydetails__update-details" style = {{position: 'relative'}}>

                                <div
                                    className="mydetails__update-details__mask"
                                    
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

                                        <div className="mydetails__update-details__update__phone">
                                            <label htmlFor="aboutBrand">About</label>
                                                <input
                                                    type = 'text'
                                                    maxLength = {200}
                                                    id = 'aboutBrand'
                                                    placeholder="About Your brand[max of 200 chars]"
                                                    value={about}
                                                    className = 'mydetails__update-details__update__phone__phone-number'
                                                    name = 'about'
                                                    onChange={setAbout}/>   
                                        </div>




                                        <div
                                        className="mydetails__update-details__update__button"
                                        onClick={() => {
                                            handleUpdate()
                                        }}
                                        >
                                            <h1>Ok</h1>
                                        </div>
                                        <div className="cancel__button__brand" onClick = {() => setUpdateProfile(false)}>
                                            <ImCross size = {24} color = 'white' className = 'cancel__button__brand__icon'/>
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
                        <div className="brand__reviews__container">
                            <BrandReviews brandId = {brandId} />
                        </div>
                    :
                    
                        null
                    
                }

                
            </div>
    )
}

export default BrandDetail
