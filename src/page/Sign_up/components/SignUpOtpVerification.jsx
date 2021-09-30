import React from 'react'

const SignUpOtpVerification = ({sendOTP, value, setValue}) => {
    return (
        <div className="signup__mobile-otp">
            <h1>Enter OTP</h1>
            <input
                type="text"
                placeholder="phone Number"
                value={value}
                maxLength={4}
                onChange={(e) => {
                setValue(e.target.value);
                }}
            />
            <button onClick={() => sendOTP()}>send otp</button>
      </div>
    )
}

export default SignUpOtpVerification
