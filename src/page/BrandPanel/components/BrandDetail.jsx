import React, {useEffect, useRef, useState}from 'react'
import UpdateProfile from '../../../components/update_profile_button/UpdateProfile'

import Chart from '../../../components/charts/Chart';
import {ImCross} from 'react-icons/im';
import { axios } from '../../../axios/axiosInstance';
import BrandReviews from './BrandReviews';
import UpdateBrandProfile from './UpdateBrandProfile';
import { clientActions } from '../../../Redux/clientslice/clientSlice';
import { useDispatch , useSelector} from "react-redux";
import { isPossiblePhoneNumber, isValidPhoneNumber , parsePhoneNumber} from 'react-phone-number-input'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator';
import VerifyOTP from '../../../components/verify-otp/VerifyOTP';
import BrandChart from './BrandChart';


const BrandDetail = ({item, brandId}) => { 

    const [option, setOption] = useState(1)
    const {client} = useSelector(state => state.client)

    const [phone, setPhone] = useState(null)
    const [about, setAbout] = useState(null)
    const [isUpdatingBrand, setIsUpdatingBrand] = useState(false)

    useEffect(() => {
        if(item){
            setPhone(item.countryCode + item.phoneNumber)
            setAbout(item.about)
        }
    }, [item])

    const dispatch = useDispatch()

    const [updateProfile, setUpdateProfile] = useState(false)
    const [verifyPhone, setVerifyPhone] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)

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


    const checkValidation = () => {
        let response;
        if(about === item.about && phone === item.countryCode + item.phoneNumber){
            response = 'nothing is changed'
            return response
        }
        else if(about === null || phone === null){
            response = 'please fill all the entries'
            return response
        }
        else if(isValidPhoneNumber(phone) === false || isPossiblePhoneNumber(phone) === false){
            response = 'phone number is invalid! please enter a valid phone number'
            return response
        }
        else{
            response = 'ok'
            return response
        }
    }
  
    const handleUpdate = () => {
        const validation = checkValidation();
        if(validation === 'ok'){
          setIsUpdatingBrand(true)
          const {countryCallingCode, nationalNumber} = parsePhoneNumber(phone)
          const {payload} = dispatch(clientActions.setClient({
              ...client, 
              brand: {
                  ...client.brand,
                  about: about,
                  phoneNumber: nationalNumber,
                  countryCode: `+${countryCallingCode}`,
              },
              
          }))
          axios.patch(`/brand/${brandId}`, payload.brand, {
              headers:{
                  "role" : client.type,
                  "authorization" : `bearer ${client.tokens.access.token}`
              }
          }).then((res) => {
            setIsUpdatingBrand(false)
            alert('Your information is changed...')
            setUpdateProfile(false)
            
          }).catch(err => {
            //   setIsUpdating(false)
              alert(JSON.stringify(err))
          })
      } 
      else{
          alert(validation)
      }
   }

   const handleOtpVerification = () => {
    setIsSendingOtp(true)
    axios.post('/auth/brand/send-verification-sms', {item}).then(() => {
      setIsSendingOtp(false)
      setVerifyPhone(true)
    }
    ).catch(err => {
      setIsSendingOtp(false)
      alert(JSON.stringify(err.response.data.message))
    })
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
                            <BrandChart brandId = {brandId}/>
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
                                <UpdateProfile onClick = {() => handleOtpVerification()} value = 'Verify Phone'/>
                                }
                            </div>
                            
                        }
                        

                        </div>

                        {
                            updateProfile ?
                            (
                                <div className="update__brand">
                                    <UpdateBrandProfile phone = {phone} setPhone = {setPhone} about = {about} setAbout = {setAbout} handleUpdate = {handleUpdate}
                                    setUpdateProfile = {setUpdateProfile}
                                    />
                                    {
                                        isUpdatingBrand && <LoadingIndicator/>
                                    }
                                </div>
                                
                            )
                            :
                            (
                                null
                            )
                        }
                        {
                            verifyPhone ?
                                <VerifyOTP onCut = {setVerifyPhone} user = {item}/>
                            :
                            null
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
