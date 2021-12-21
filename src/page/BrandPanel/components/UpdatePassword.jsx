import React, { useState } from 'react'
import { statusAction } from '../../../Redux/statusSlice'
import { useDispatch } from 'react-redux'
import { axios } from '../../../axios/axiosInstance'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import { useSelector } from 'react-redux'

const UpdatePassword = ({brandId}) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)
    const dispatch = useDispatch()
    const {client} = useSelector(state => state.client)
    
    //ANCHOR password validation
    const CheckPassword = () => { 
        var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(newPassword.match(paswd)){
            return true;
        }
        else{ 
            return false;
        }
    }

    const validationCheck = () => {
        
        if(newPassword && !CheckPassword()){
            return 'şifre 7-15 karakter uzunluğunda olmalı ve en az bir sayısal rakam ve özel karakter içermelidir'
        }
        else if(!oldPassword || !newPassword || !confirmPass ){
            return 'Lütfen Gerekli Alanları Doldurunuz.'
        }
        else if(oldPassword === newPassword){
            return 'Eski Şifre ve Yeni Şifre aynı...'
        }
        else if(newPassword !== confirmPass){
            return 'Şifre ve Şifreyi Onayla eşleşmiyor...'
        }
        else{
            return 'ok'
        }
    }
    const handleUpdatePassword = () => {
        const valid = validationCheck()
        if(valid === 'ok'){
            setIsPasswordChanging(true)
            dispatch(statusAction.setNotification({
                message: 'wait..',
                type: "loading"
              }))
            axios.post('/auth/brand/change-password', {
                id: brandId,
                oldPassword,
                newPassword,
            }, {
                headers: {
                    'authorization': `bearer ${client.tokens.access.token}`,
                    'role': client.type
                }
            }).then((_)=>{
                dispatch(statusAction.setNotification({
                    message: 'your password is changed',
                    type: "success"
                  }))
                  setIsPasswordChanging(false)
                  setConfirmPass('')
                  setNewPassword('')
                  setOldPassword('')
            }
            ).catch(err => {
                dispatch(statusAction.setNotification({
                    message: err.response.data.message,
                    type: "error"
                  }))
                  setIsPasswordChanging(false)
            })

        }
        else{
            dispatch(statusAction.setNotification({
                message: valid,
                type: "error"
              }))
        }
    }
    return (
        <div className = 'update__brand__password__container'>
            <p>Şifrenizi Güncelleyin</p>
            <div className = 'update__brand__password__container__inputs'>
                <div className = 'update__brand__password__container__inputs__old-pass'>
                    <label htmlFor = 'brandOldPassword'>Eski Şifreniz</label>
                    <input
                        type = 'password'
                        id = 'brandOldPassword'
                        placeholder = 'eski şifrenizi girin'
                        name = 'brand new password'
                        value = {oldPassword}
                        onChange = {e => setOldPassword(e.target.value)}
                    />
                </div>

                <div className = 'update__brand__password__container__inputs__new-pass'>
                    <label htmlFor = 'brandNewPassword'>Yeni Şifreniz</label>
                    <input
                        type = 'password'
                        id = 'brandNewPassword'
                        placeholder = 'Yeni şifrenizi giriniz'
                        name = 'brand new password'
                        value = {newPassword}
                        onChange = {e => setNewPassword(e.target.value)}
                    />
                </div>

                <div className = 'update__brand__password__container__inputs__confirm-pass'>
                    <label htmlFor = 'confirmPass'>Yeni şifrenizi giriniz</label>
                    <input
                        type = 'password'
                        id = 'confirmPass'
                        name = 'brand confirm password'
                        placeholder = 'Yeni şifrenizi giriniz'
                        value = {confirmPass}
                        onChange = {e => setConfirmPass(e.target.value)}
                    />
                </div>
            </div>
            <button className = 'update__brand__password__container__button' onClick = {handleUpdatePassword}>
                Onayla {isPasswordChanging && <LoadingIndicator/>}   
            </button>

        </div>
    )
}

export default UpdatePassword
