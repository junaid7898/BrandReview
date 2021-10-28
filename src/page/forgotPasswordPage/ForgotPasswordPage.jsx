import React, { useState } from 'react'
import { statusAction } from '../../Redux/statusSlice'
import { useDispatch } from 'react-redux'

const ForgotPasswordPage = () => {
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const dispatch = useDispatch()
    
    const CheckPassword = () => { 
        var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(password.match(paswd)){
             return true;
        }
        else{ 
            return false;
        }
    }
    const validationCheck = () => {
        const validPassword = CheckPassword()
        if(password === null || confirmPassword === null){
            return 'please fill all the entries....'
        }
        else if(!validPassword){
            return 'password must be between 7-15 characters long and contain at least one numeric digit and special character '
        }
        else if(password !== confirmPassword){
            return 'both password feilds must match'
        }
        else{
            return 'ok'
        }
    }


    //ANCHOR here handle the forgotpassword axios call
    const handleForgotPassword = () => {
        const validation = validationCheck()
        if(validation === 'ok'){
            //TODO here call an axios method to change password
            alert(`${password} and ${confirmPassword}`)
        }
        else{
            dispatch(statusAction.setNotification({
                message: validation,
                type: "error"
              }))
        }
    }
    return (
        <div className="forgot__password__page">
            <div className="forgot__password__page__container">
                <h1>Provide with your new password!</h1>
                <h5>Password must be 7 to 15 characters which contain at least one numeric digit and a special character</h5>
                <div className="forgot__password__page__container__input">
                    <label htmlFor = 'newPassword'>New Password</label>
                    <input
                        type = 'password'
                        id = 'newPassword'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        name = 'password'
                        placeholder = 'Enter your new Password'
                    />
                </div>
                <div className="forgot__password__page__container__input">
                    <label htmlFor = 'confirmPassword'>Confirm Password</label>
                    <input
                        type = 'password'
                        id = 'confirmPassword'
                        value = {confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                        name = 'password'
                        placeholder = 'Enter your password again'
                    />
                </div>
                <div className="forgot__password__page__container__button" onClick = {handleForgotPassword}>
                    <h3>Confirm</h3>
                </div>

            </div>
        </div>
    )
}

export default ForgotPasswordPage
