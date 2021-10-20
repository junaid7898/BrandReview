import axios from "axios";
import React, { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import PhoneInput from 'react-phone-number-input';
import { isPossiblePhoneNumber, formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber , parsePhoneNumber} from 'react-phone-number-input'
import { useDispatch , useSelector} from "react-redux";
import {clientActions} from '../../../../../../../Redux/clientslice/clientSlice'

const UpdateProfileComponents = ({ onSubmit }) => {
  const [phone, setPhone] = useState(null);
  const {client} = useSelector(state => state.client)
  const dispatch = useDispatch()
  const [birthday, setBirthday] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [address, setAddress] = useState(null);



  const handleDate = (value) => {
    setBirthday(value);
  };

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
        console.log('payload: ',JSON.stringify(payload));
        axios.patch(`http://localhost:4000/v1/user/${client.user.id}`, payload)   
        alert(JSON.stringify(details)) 
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
                    onChange={(value) => handleDate(value)}
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
                // onSubmit(false);
                handleUpdate()
            }}
            >
                <h1>Ok</h1>
            </div>
        </div>
    </div>
  );
};

export default UpdateProfileComponents;
