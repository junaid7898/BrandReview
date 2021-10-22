import React, { useState } from "react";
import UpdateProfile from "../../../../../../components/update_profile_button/UpdateProfile";
import VerifyOTP from "../../../../../../components/verify-otp/VerifyOTP";
import DetailTag from "./components/DetailTag";
import { axios } from "../../../../../../axios/axiosInstance";

import UpdateProfileComponents from "./components/UpdateProfileComponents";
const MyDetails = ({ user }) => {

  const [phone, setPhone] = useState(null);
  const [birthday, setBirthday] = useState(new Date().toISOString().split("T")[0]);
  const [address, setAddress] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [email, setEmail] = useState(null);


  const [updateProfile, setUpdateProfile] = useState(false);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false)
  const onSubmit = () => {
    console.log("data is uploaded");
  };

  const handleOtpVerification = () => {
    const phoneNumber = user.countryCode + user.phoneNumber;
    axios.post('/auth/user/send-verification-sms', {user}).then(() => {
      console.log('rres')
      setVerifyPhoneNumber(true)
    }
    )
  }

  return (
    <section className="mydetails">
      {user ? (
        <>
          <div className="mydetails__details">
            <DetailTag class1="tag " label="phone" value={user.countryCode+" "+user.phoneNumber} isPhoneNumber = {true} verification = {user.isPhoneVerified}/>
            <DetailTag
              class1="tag "
              label="Birthday"
              value={new Date(user.dateOfBirth).toDateString()}
            />
            <DetailTag
              class1="tag tag__address"
              label="address"
              value={user.address}
            />
            <DetailTag class1="tag " label="Email" value={user.email} />
          </div>

          <div className="mydetails__update-button">
              <div className="mydetails__update-button__button1">
                <UpdateProfile onClick={() => setUpdateProfile(true)} value = 'Update Profile' />
              </div>
          {
             user.isPhoneVerified ?
              null
              :
              <div className="mydetails__update-button__button2">
                <UpdateProfile onClick = {() => handleOtpVerification()} value = 'Verify Phone'/>
              </div>
            
          }
          

          </div>
          {
              updateProfile ? 
              (
                    <UpdateProfileComponents onSubmit = {setUpdateProfile} user = {user}/>
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
