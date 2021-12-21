import React, { useState } from "react";
import UpdateProfile from "../../../../../../components/update_profile_button/UpdateProfile";
import VerifyOTP from "../../../../../../components/verify-otp/VerifyOTP";
import DetailTag from "./components/DetailTag";
import { axios } from "../../../../../../axios/axiosInstance";
import { statusAction } from "../../../../../../Redux/statusSlice";
import { useDispatch } from "react-redux";
import UpdateProfileComponents from "./components/UpdateProfileComponents";
import LoadingIndicator from "../../../../../../components/loadingIndicator/LoadingIndicator";
import UpdateUserProfile from "./components/UpdateUserProfile";
const MyDetails = ({ user, setClientDetails }) => {

  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const dispatch = useDispatch()

  const [updateProfile, setUpdateProfile] = useState(false);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false)
  const onSubmit = () => {
    console.log("data is uploaded");
  };

  const handleOtpVerification = () => {
    dispatch(statusAction.setNotification({
      message: 'Şifre Gönderme',
      type: "loading"
    }))
    const phoneNumber = user.countryCode + user.phoneNumber;
    setIsSendingOtp(true)
    axios.post('/auth/user/send-verification-sms', {user})
    .then(() => {
      dispatch(statusAction.setNotification({
        message: 'Şirfe Gönderildi',
        type: "success"
      }))
      setIsSendingOtp(false)
      setVerifyPhoneNumber(true)
      
    }
    ).catch(err => {
      dispatch(statusAction.setNotification({
        message: err.response.data.message,
        type: "error"
      }))
      setIsSendingOtp(false)
      alert(JSON.stringify(err.response.data.message))
    })
  }

  return (
    <section className="mydetails">
      {user ? (
        <>
          <div className="mydetails__details">
            <DetailTag class1="tag " label="Telefon" value={user.countryCode+" "+user.phoneNumber} isPhoneNumber = {true} verification = {user.isPhoneVerified}/>
            <DetailTag
              class1="tag "
              label="Doğum Tarihi"
              value={new Date(user.dateOfBirth).toDateString()}
            />
            <DetailTag
              class1="tag tag__address"
              label="Adres"
              value={user.address}
            />
            <DetailTag class1="tag " label="E-posta" value={user.email} />
          </div>

          <div className="mydetails__update-button">
              <div className="mydetails__update-button__button1">
                <UpdateProfile onClick={() => setUpdateProfile(true)} value = 'Bilgileri Güncelle' />
              </div>
          {
             user.isPhoneVerified ?
              null
              :
              <div className="mydetails__update-button__button2" style = {{position: 'relative'}}>
                {
                  isSendingOtp ? 
                  <LoadingIndicator/>
                  :
                  <UpdateProfile onClick = {() => handleOtpVerification()} value = 'Telefonunu Onayla'/>
                }
              </div>
            
          }
          

          </div>
          {
              updateProfile ? 
              (
                    <UpdateUserProfile onSubmit = {setUpdateProfile} user = {user} setClientDetails = {setClientDetails}/>
              ) 
                : 
                null
          }
          {
            verifyPhoneNumber ? 
            (
              <VerifyOTP onCut = {setVerifyPhoneNumber} user = {user}/>
            )
            :
            (
              null
            )
          }
        </>
      ) : null}
    </section>
  );
};

export default MyDetails;
