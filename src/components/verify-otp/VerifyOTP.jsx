import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import { axios } from '../../axios/axiosInstance'
const VerifyOTP = ({onSubmit, onCut, user}) => {
    const [otp, setOtp] = useState('')

    const handleOtp = () => {
        const otpNum = parseInt(otp)
        axios.post(`/auth/user/verify-phone?OTPCode=${otpNum}`, {user})
        .then(res => {
            console.log('dddddd');
            onCut(false)
        })
    }
    return (
        <div className="verifyOtp">

            <div className="verifyOtp__container">

                <div className="verifyOtp__container__header">
                    <p>Telefonunuza gelen şifreyi giriniz</p>
                </div>

                <div className="verifyOtp__container__input-button">

                    <div className="verifyOtp__container__input-button__input">

                        <label htmlFor = 'otpVerification'>Kod</label>
                        <input
                            type = 'text'
                            maxLength = {4}
                            name = 'code'
                            placeholder = 'Telefonunuza gelen şifrenizi girin'
                            value = {otp}
                            onChange = {e=>setOtp(e.target.value)}
                        />

                    </div>

                    <div className="verifyOtp__container__input-button__button" onClick = {() => handleOtp()}>
                        <p>Devam Et</p>
                    </div>

                </div>
                <div className="verifyOtp__cross" onClick = {() => onCut(false)}>
                    <ImCross size = {24} color = 'white' className = 'verifyOtp__cross__icon'/>
                </div>
            </div>


        </div>
    )
}

export default VerifyOTP
