import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import { statusAction } from '../../Redux/statusSlice';
import { useDispatch } from "react-redux";
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';

const ForgotPassword = ({onCancel, onSubmit, isSending}) => {
    const [emailAddress, setEmailAddress] = useState('')
    const dispatch = useDispatch()
    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailAddress).toLowerCase());
      }

    const submitEmail = () => {
        let emailValidation;
        if(emailAddress){
            console.log('here');
            emailValidation = validateEmail()
        }
        if(emailAddress === null || emailAddress === ''){   
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
                    <label htmlFor = 'email'>Email Adresiniz</label>
                    <input
                        type = 'text'
                        placeholder = 'Email Adresinizi Yazınız'
                        name = 'email'
                        value = {emailAddress}
                        onChange = {e => setEmailAddress(e.target.value)}
                    />
                </div>
                <button disabled={isSending} className="forgot__password__container__button" onClick = {() => submitEmail(emailAddress)}>
                    <h3> Yeni Şifre Gönder </h3>
                    {
                        isSending &&
                        <LoadingIndicator />
                    }
                </button>
                <div className="forgot__password__container__icon" onClick = {() => onCancel(false)}>
                    <ImCross className="forgot__password__container__icon__svg"/>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
