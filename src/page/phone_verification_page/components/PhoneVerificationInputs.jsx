import React, { useState } from 'react'

const PhoneVerificationInputs = () => {
    const [otp, setOtp] = useState('')

    const otpVerification = () => {
        console.log('otp verified')
    }
    return (
        <div className="phone__verification__inputs">
        <div className="phone__verification__inputs__title">
          <h1>Enter Phone Verification Code</h1>
        </div>
  
        <div className="phone__verification__inputs__otp">
          <label htmlFor = "otpMobile">Code</label>
          <input
            id = "otpMobile"
            type="otp"
            name="otp"
            placeholder="Enter otp sent to your phone"
            maxLength = {4}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
  
        <button
          className="phone__verification__inputs__button"
          title="Continue"
          onClick={otpVerification}
        >
          Continue
        </button>

      </div>
    )
}

export default PhoneVerificationInputs
