import React, { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import PhoneInput from 'react-phone-number-input';
import { isPossiblePhoneNumber, formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber , parsePhoneNumber} from 'react-phone-number-input'
import { useDispatch , useSelector} from "react-redux";
import { axios } from "../../../../../../../axios/axiosInstance";
import LoadingIndicator from "../../../../../../../components/loadingIndicator/LoadingIndicator";
import {clientActions} from '../../../../../../../Redux/clientslice/clientSlice'

const UpdateProfileComponents = ({ onSubmit, user }) => {
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
      if(address === null || phone === null){
          response = 'please fill all entries'
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
        axios.patch(`/user/${client.user.id}`, payload.user, {
            headers:{
                "role" : "user",
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then((res) => {
            onSubmit(false)
            setIsUpdating(false)
        }).catch(err => {
            setIsUpdating(false)
            alert(JSON.stringify(err))
        })
    } 
    else{
        alert(validation)
    }
 }
 


  return (
    <div className="mydetails__update-details">


        <div
            className="mydetails__update-details__mask"
            onClick={() => onSubmit(false)}
        >
        </div>


        <h1>Update Profile</h1>


        <div className="mydetails__update-details__update">

            

            <div className="mydetails__update-details__update__phone">
                 <label htmlFor="phoneNumber">Phone Number </label>
                    <PhoneInput
                        id = 'phoneNumber'
                        placeholder="Enter phone number"
                        value={phone}
                        className = 'mydetails__update-details__update__phone__phone-number'
                        name = 'phone number'
                        onChange={setPhone}/>   
            </div>

            <div className="mydetails__update-details__update__dob">
                <label htmlFor="birthDate">Birthday </label>
                <DatePicker
                    id="birthDate"
                    placeholder="click to open"
                    value={birthday}
                    onChange={setBirthday}
                    multiple={false}
                    range={false}
                    containerClassName="mydetails__update-details__update__dob__container"
                    inputClass="mydetails__update-details__update__dob__input"
                    maxDate={new Date()}
                />
            </div>


            <div className="mydetails__update-details__update__address">
                <label htmlFor="address">Address </label>
                <textarea
                    id = 'address'
                    placeholder = 'please enter your address'
                    value = {address}
                    name = 'address'
                    onChange = {(e) => setAddress(e.target.value)}
                    maxLength = {100}
                />
            </div>


            

            {/* <div className="mydetails__update-details__update__email">
                <label htmlFor="email">Email </label>
                <input
                    id="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                />
            </div> */}
            <div
            className="mydetails__update-details__update__button"
            onClick={() => {
                handleUpdate()
            }}
            >
                <h1>{isUpdating? (<LoadingIndicator/>): 'ok'}</h1>
            </div>
        </div>
    </div>
  );
};

export default UpdateProfileComponents;
