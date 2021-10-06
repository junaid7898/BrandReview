import React from 'react'
import RegistrationPageComponent from '../../components/registration_page_component/RegistrationPageComponent'
import PhoneVerificationInputs from './components/PhoneVerificationInputs'

const PhoneVerification = () => {
    return (
        <div className="otp">
            <RegistrationPageComponent/>
            <PhoneVerificationInputs/>
        </div>
    )
}

export default PhoneVerification
