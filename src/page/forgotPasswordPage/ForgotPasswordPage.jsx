import React, { useState } from 'react'
import { statusAction } from '../../Redux/statusSlice'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { axios } from '../../axios/axiosInstance'
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'

const ForgotPasswordPage = () => {
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const {token, type} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isProcessing, setIsProcessing] = useState(false)
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
        if(password === null || confirmPassword === null){
            return 'please fill all the entries....'
        }
        else if(!CheckPassword()){
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
            // alert(`${password} and ${confirmPassword}`)
            if(type === "user"){
                axios.post(`/auth/user/reset-password?token=${token}`, {password: password})
                .then((_) => {
                    dispatch(statusAction.setNotification({
                        message: "Password Changed Successfully",
                        type: "success"
                      }))
                    history.push('/')
                })
                .catch(err =>{
                    dispatch(statusAction.setNotification({
                        message: "Password Changed Failed",
                        type: "error"
                      }))
                    console.log(err)
                })
                console.log("brand")
            }
            else if(type === "brand"){
                axios.post(`/auth/brand/reset-password?token=${token}`, {password: password})
                .then((_) => {
                    dispatch(statusAction.setNotification({
                        message: "Password Changed Successfully",
                        type: "success"
                      }))
                    history.push('/')
                })
                .catch(err =>{
                    dispatch(statusAction.setNotification({
                        message: "Password Changed Failed",
                        type: "error"
                      }))
                    console.log(err)
                })
            }
        }
        else{
            dispatch(statusAction.setNotification({
                message: validation,
                type: "error"
              }))
              return 
        }
        console.log(password)
        
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
                <button className="forgot__password__page__container__button" onClick = {handleForgotPassword}>
                    <h3>Confirm</h3>
                    {
                        isProcessing &&
                        <LoadingIndicator />
                    }
                </button>

            </div>
        </div>
    )
}

export default ForgotPasswordPage
