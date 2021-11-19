import React from 'react'
import RegistrationPageComponent from '../../components/registration_page_component/RegistrationPageComponent'

import LoginInputs from './components/LoginInputs'
import VerticalDotBackGround from './components/VerticalDotBackGround'
import ZigZagBackgroundComponent from './components/ZigZagBackgroundComponent'
import SpiralBackground from './components/SpiralBackground'
import BlueSpiralBackground from './components/BlueSpiralBackground'

const Login = () => {
    return (
        <>
        <div className = 'login'>
            <div className="login__component">
                <RegistrationPageComponent/>
            </div>
                <LoginInputs/>
            
            <div className = 'login__dots-vertical-background'>
                <VerticalDotBackGround/>
            </div>

            <div className = 'login__dots-vertical-background2'>
                <VerticalDotBackGround/>
            </div>

            <div className = 'login__zig-zag-background'>
                <ZigZagBackgroundComponent/>
            </div>

            <div className = 'login__spiral-background'>
                <SpiralBackground/>
            </div>
            <div className = 'login__blue-spiral-background'>
                <BlueSpiralBackground/>
            </div>
        </div>
        </>
    )
}

export default Login
