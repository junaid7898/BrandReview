import React, { useState } from 'react'
import { statusAction } from '../../../Redux/statusSlice'
import { useDispatch } from 'react-redux'
import { axios } from '../../../axios/axiosInstance'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import { useSelector } from 'react-redux'

const UpdatePassword = ({brandId}) => {
    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPass, setConfirmPass] = useState(null)
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
            return 'password must be between 7-15 characters long and contain at least one numeric digit and special character'
        }
        else if(!oldPassword || !newPassword || !confirmPass ){
            return 'please fill all entries...'
        }
        else if(oldPassword === newPassword){
            return 'Old Password and New Password are same...'
        }
        else if(newPassword !== confirmPass){
            return 'Password and Confirm password does not match...'
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
                  setConfirmPass(null)
                  setNewPassword(null)
                  setOldPassword(null)
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
            <p>Update Your Password</p>
            <div className = 'update__brand__password__container__inputs'>
                <div className = 'update__brand__password__container__inputs__old-pass'>
                    <label htmlFor = 'brandOldPassword'>Old Password</label>
                    <input
                        type = 'password'
                        id = 'brandOldPassword'
                        placeholder = 'Enter your old password'
                        name = 'brand new password'
                        value = {oldPassword}
                        onChange = {e => setOldPassword(e.target.value)}
                    />
                </div>

                <div className = 'update__brand__password__container__inputs__new-pass'>
                    <label htmlFor = 'brandNewPassword'>New Password</label>
                    <input
                        type = 'password'
                        id = 'brandNewPassword'
                        placeholder = 'Enter your new password'
                        name = 'brand new password'
                        value = {newPassword}
                        onChange = {e => setNewPassword(e.target.value)}
                    />
                </div>

                <div className = 'update__brand__password__container__inputs__confirm-pass'>
                    <label htmlFor = 'confirmPass'>Confirm Password</label>
                    <input
                        type = 'password'
                        id = 'confirmPass'
                        name = 'brand confirm password'
                        placeholder = 'Confirm your password'
                        value = {confirmPass}
                        onChange = {e => setConfirmPass(e.target.value)}
                    />
                </div>
            </div>
            <button className = 'update__brand__password__container__button' onClick = {handleUpdatePassword}>
                Change {isPasswordChanging && <LoadingIndicator/>}   
            </button>

        </div>
    )
}

export default UpdatePassword
