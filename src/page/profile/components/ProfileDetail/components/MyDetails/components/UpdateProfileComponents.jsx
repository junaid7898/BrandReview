import React, { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import PhoneInput from 'react-phone-number-input'

const UpdateProfileComponents = ({ onSubmit }) => {
  const [phone, setPhone] = useState(null);
  const [birthday, setBirthday] = useState(
    new Date().toISOString().split("T")[0]
  );
//   const [address, setAddress] = useState(null);

  const address1 = useRef()
  const address2 = useRef()
  const address3 = useRef()
  const [countryCode, setCountryCode] = useState(null);
  const [email, setEmail] = useState(null);


  const handleDate = (value) => {
    setBirthday(value);
  };

  const handleUpdate = () => {
      const address = address1.current + address2.current + address3.current;
      console.log(address, countryCode, phone, birthday);
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
                {/* <div className="mydetails__update-details__update__phone__phone-number"> */}
                    {/* <input
                        id="countryCode"
                        placeholder="country code"
                        className = 'mydetails__update-details__update__phone__phone-number__country-code'
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        name="country code"
                    /> */}
                    <PhoneInput
                        id = 'phoneNumber'
                        placeholder="Enter phone number"
                        value={phone}
                        className = 'mydetails__update-details__update__phone__phone-number'
                        name = 'phone number'
                        onChange={setPhone}/>

                    {/* <input
                        id="phoneNumber"
                        placeholder="enter your phone number"
                        className = 'mydetails__update-details__update__phone__phone-number__number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        name="phone number"
                    /> */}
                    
                {/* </div> */}
                
                
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
                <input
                    id="address"
                    placeholder="enter your address"
                    onChange={(e) => address1.current = e.target.value}
                    name="address"
                />
                <input
                    id="addressLine1"
                    placeholder="line 1"
                    onChange={(e) => address2.current = e.target.value}
                    name="address"
                />
                <input
                    id="addressLine2"
                    placeholder="line 2"
                    onChange={(e) => address3.current = e.target.value}
                    name="address"
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
                onSubmit(false);
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
