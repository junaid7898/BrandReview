import React from 'react'
import RegistrationPageComponent from '../../components/registration_page_component/RegistrationPageComponent'
import LoginInputs from './components/LoginInputs'

const Login = () => {
    return (
        <div className = 'login'>
            <div className="login__component">
                <RegistrationPageComponent/>
            </div>
            <LoginInputs/>
        </div>
    )
}

export default Login
