import React, { useRef, useState } from 'react'
import LoadingIndicator from '../../../../../../../components/loadingIndicator/LoadingIndicator';
import DatePicker from "react-multi-date-picker";
import PhoneInput from 'react-phone-number-input';
import { isPossiblePhoneNumber, formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber , parsePhoneNumber} from 'react-phone-number-input'
import { useDispatch , useSelector} from "react-redux";
import { axios } from '../../../../../../../axios/axiosInstance';
import { statusAction } from '../../../../../../../Redux/statusSlice';
import { clientActions } from '../../../../../../../Redux/clientslice/clientSlice';
import {ImCross} from 'react-icons/im'

const UpdateUserProfile = ({onSubmit, user, setClientDetails}) => {
    const formRef = useRef()
    const [phone, setPhone] = useState(user.countryCode + user.phoneNumber);
    const {client} = useSelector(state => state.client)
    const dispatch = useDispatch()
    const [birthday, setBirthday] = useState(
        new Date(user.dateOfBirth)
    );
    const [address, setAddress] = useState( user.address);
    const [isUpdating, setIsUpdating] = useState(false)


    const checkValidation = () => {
        let response;
        console.log('here....');
        if(address === '' || phone === ''){
                response = 'please fill all entries'
                return response
            }
            else if(phone === user.countryCode + user.phoneNumber && birthday === new Date(user.dateOfBirth) && address === user.address ){
                response = 'no information is changed.....'
                return response
            }
            else if(isValidPhoneNumber(phone) === false || isPossiblePhoneNumber(phone) === false){
                response = 'phone number is invalid! please enter a valid phone number'
                return response
            }
            else{
                response = 'ok'
                return response
            }
    }

    const handleUpdate = () => {
        const validation = checkValidation();
        if(validation === 'ok'){
            dispatch(statusAction.setNotification({
                message: 'updating user information....',
                type: "loading"
            }))
            setIsUpdating(true)
            const {countryCallingCode, nationalNumber} = parsePhoneNumber(phone)
            const details = {address: address,phoneNumber: phone, birthday: birthday };
            const {payload} = dispatch(clientActions.setClient({
                ...client, 
                user: {
                    ...client.user,
                    dateOfBirth: birthday,
                    phoneNumber: nationalNumber,
                    countryCode: `+${countryCallingCode}`,
                    address: address
                },
                
            }))
            setClientDetails(payload.user)
            axios.patch(`/user/${client.user.id}`, payload.user, {
                headers:{
                    "role" : "user",
                    "authorization" : `bearer ${client.tokens.access.token}`
                }
            }).then((res) => {
                dispatch(statusAction.setNotification({
                    message: 'updated....',
                    type: "success"
                    }))
                onSubmit(false)
                setIsUpdating(false)
                
            }).catch(err => {
                dispatch(statusAction.setNotification({
                    message: err.response.data.message,
                    type: "error"
                    }))
                setIsUpdating(false)
                alert(JSON.stringify(err))
            })
        } 
        else{
            dispatch(statusAction.setNotification({
                message: validation,
                type: "error"
            }))
        }
    }
    return (
        <div className = 'update__user__profile'>
            <div className="update__user__profile__mask">
            </div>

            <div className="update__user__profile__component" ref = {formRef}>
                <form className = 'update__user__profile__component__form' 
                    onSubmit = {(e) => {
                        e.preventDefault()
                        handleUpdate()
                    }}>

                    <div className="update__user__profile__component__form__phone">
                        <label htmlFor="phoneNumber">Telefon Numarası </label>
                        <PhoneInput   
                            id = 'phoneNumber'
                            placeholder="Enter phone number"
                            value={phone}
                            className = 'update__user__profile__component__form__phone__select'
                            // style = 'mydetails__update-details__update__phone__phone-number'
                            name = 'phone number'
                            onChange={setPhone}/> 
                    </div>

                    <div className = 'update__user__profile__component__form__birthday'>
                        <label htmlFor="birthDate">Doğum Tarihi </label>
                        <DatePicker
                            id="birthDate"
                            placeholder="click to open"
                            value={birthday}
                            onChange={setBirthday}
                            multiple={false}
                            range={false}
                            containerClassName="update__user__profile__component__form__birthday__picker"
                            inputClass="update__user__profile__component__form__birthday__input"
                            maxDate={new Date()}
                        />
                    </div>
                    
                    <div className="update__user__profile__component__form__address">
                        <label htmlFor="address">Adres </label>
                        <textarea
                            id = 'address'
                            className = 'update__user__profile__component__form__address__textarea'
                            placeholder = 'please enter your address'
                            value = {address}
                            name = 'address'
                            onChange = {(e) => setAddress(e.target.value)}
                            maxLength = {100}
                        />
                    </div>

                    <button className = 'update__user__profile__component__form__submit' type = 'submit'>
                    Onayla {isUpdating && <LoadingIndicator/> }
                    </button>
                </form>

                <div className = 'update__user__profile__component__cancel-button' onClick={() => onSubmit(false)}>
                    <ImCross className = 'update__user__profile__component__cancel-button__icon'/>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserProfile
