import React, {useEffect, useRef, useState}from 'react'
import UpdateProfile from '../../../components/update_profile_button/UpdateProfile'
import { axios } from '../../../axios/axiosInstance';
import BrandReviews from './BrandReviews';
import UpdateBrandProfile from './UpdateBrandProfile';
import { clientActions } from '../../../Redux/clientslice/clientSlice';
import { useDispatch , useSelector} from "react-redux";
import { isPossiblePhoneNumber, isValidPhoneNumber , parsePhoneNumber} from 'react-phone-number-input'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator';
import VerifyOTP from '../../../components/verify-otp/VerifyOTP';
import BrandChart from './BrandChart';
import { statusAction } from "../../../Redux/statusSlice";
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker';
import FilterComponent from '../../../components/filter_component/FilterComponent';


const BrandDetail = ({item, brandId}) => { 

    const [option, setOption] = useState(1)
    const {client} = useSelector(state => state.client)
    const [date, setDate] = useState(null)

    const [about, setAbout] = useState(null)
    const [isUpdatingBrand, setIsUpdatingBrand] = useState(false)
    const [filters, setFilters] = useState({})
    const [sortOptions, setSortOptions] = useState({})
    useEffect(() => {
        if(item){
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
        if(about === item.about){
            response = 'nothing is changed'
            return response
        }
        else if(about === null){
            response = 'please fill all the entries'
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
            dispatch(statusAction.setNotification({
                message: 'updating info please wait....',
                type: "loading"
              }))
          setIsUpdatingBrand(true)
          const {payload} = dispatch(clientActions.setClient({
              ...client, 
              brand: {
                  ...client.brand,
                  about: about,
              },
              
          }))
          axios.patch(`/brand/${brandId}`, payload.brand, {
              headers:{
                  "role" : client.type,
                  "authorization" : `bearer ${client.tokens.access.token}`
              }
          }).then((res) => {
            dispatch(statusAction.setNotification({
                message: 'your information is updated...',
                type: "success"
              }))
            setIsUpdatingBrand(false)
            setUpdateProfile(false)
            
          }).catch(err => {
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
              }))
          })
      } 
      else{
        dispatch(statusAction.setNotification({
            message: validation,
            type: "error"
          }))
      }
   }

   const handleOtpVerification = () => {
    setIsSendingOtp(true)
    axios.post('/auth/brand/send-verification-sms', {brand: item}).then(() => {
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
                <div className="dashboard__list__brand__link">
                    <ul>
                        <li onClick = {handleShowDashBoard} className = {option === 1 ? 'list__click': ''}>Dashboard</li>
                        <li onClick = {handleShowReviews} className = {option === 2 ? 'list__click': ''}>Reports</li>
                        <li onClick = {handleShowSettings} className = {option === 3 ? 'list__click': ''}>Settings</li>
                    </ul>
                    <div className="dashboard__list__brand__link__filters">
                        {
                            option !== 3 &&
                            <div className="dashboard__list__brand__link__filters__item">
                                <MultiDatePicker date={date} setDate={setDate} />
                            </div>
                        }
                        {
                            option !== 1 && option !== 3 &&
                            <div className="dashboard__list__brand__link__filters__item">
                                <FilterComponent tab="review" setFilters={setFilters} setSortOptions={setSortOptions}  />
                            </div>
                        }
                    </div>
                </div>
                {
                    option === 1 && item &&
                        <div className="dashboard__list__chart">
                            <BrandChart brandId = {brandId} date={date}/>
                        </div>
                }

                {
                    option === 3 && item ?    
                    (
                        <>
                        <div className="dashboard__list__settings">   

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__brand-name">
                                    <h3>Brand Name</h3>
                                    <h4>{item.name}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__category-name">
                                    <h3>Category</h3>
                                    <h4>{item.category ? item.category : " - "}</h4>
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
                                <UpdateProfile onClick={() => setUpdateProfile(true)}  value = 'Update Profile' />
                            </div>
                        {/* {
                            item.isPhoneVerified ?
                            null
                            :
                            <div className="mydetails__update-button__button2" style = {{position: 'relative'}}>
                                {
                                <UpdateProfile onClick = {() => handleOtpVerification()} value = 'Verify Phone'/>
                                }
                            </div>
                            
                        } */}
                        

                        </div>

                        {
                            updateProfile ?
                            (
                                <div className="update__brand">
                                    <UpdateBrandProfile  about = {about} setAbout = {setAbout} handleUpdate = {handleUpdate}
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
                            //FIXME while sending otp show loading indicator
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
                            <BrandReviews brandId = {brandId} filters={filters} sortOptions={sortOptions} date={date} />
                        </div>
                    :
                    
                        null
                    
                }

                
            </div>
    )
}

export default BrandDetail
