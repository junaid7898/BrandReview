import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import { statusAction } from '../../Redux/statusSlice';
import { useDispatch } from "react-redux";
import { GiSverdIFjell } from 'react-icons/gi';

const ForgotPassword = ({onCancel, onSubmit}) => {
    const [emailAddress, setEmailAddress] = useState(null)
    const dispatch = useDispatch()

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailAddress).toLowerCase());
      }

    const submitEmail = () => {
        const emailValidation = validateEmail()
        if(emailAddress === null){
            dispatch(statusAction.setNotification({
                message: "Must enter email address....",
                type: "error"
              }))
        }
        else if(emailValidation === false){
            dispatch(statusAction.setNotification({
                message: "Enter a valid email address....",
                type: "error"
              }))
        }
        else{
            onSubmit(emailAddress)
        }
    }
    return (
        <div className="forgot__password">
            <div className="forgot__password__container">
                <div className="forgot__password__container__inputs">
                    <label htmlFor = 'email'>Enter your Email</label>
                    <input
                        type = 'text'
                        placeholder = 'Enter your Email Address'
                        name = 'email'
                        value = {emailAddress}
                        onChange = {e => setEmailAddress(e.target.value)}
                    />
                </div>
                <div className="forgot__password__container__button" onClick = {() => submitEmail(emailAddress)}>
                    <h3> Forgot Password </h3>
                </div>
                <div className="forgot__password__container__icon" onClick = {() => onCancel(false)}>
                    <ImCross size = {24} color = 'white'/>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
