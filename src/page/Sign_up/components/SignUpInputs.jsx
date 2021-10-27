import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { statusAction } from "../../../Redux/statusSlice";
import PhoneInput from "react-phone-number-input";
import {
  isPossiblePhoneNumber,
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

const SignUpInputs = () => {

  // ANCHOR form states
  const [username, setClientName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [phone, setPhone] = useState(null);

  //ANCHOR loading states
  const [isSigningIn, setIsSigningIn] = useState(false);

  // ANCHOR states for redux
  const [user, setClient] = useState(null);
  const dispatch = useDispatch();

  //ANCHOR email validation
  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

    //ANCHOR password validation
    const CheckPassword = () => { 
      var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
      if(password.match(paswd)){
           return true;
      }
      else{ 
          return false;
      }
    }


  // ANCHOR validation function for form
  const checkValidation = () => {
      const emailValidation =  validateEmail();
      const validPassword = CheckPassword()
    if(username === null || email === null || password === null || repeatPassword === null || phone === null){
      return 'please fill all entries'
    }
    else if(emailValidation === false){
      return 'please enter a valid email'
    }
    else if(!validPassword){
      return 'password must be between 7-15 characters long and contain at least one numeric digit and special character'
    }
    else if(password !== repeatPassword){
      return 'password and repeated password must be same'
    }
    else if( isValidPhoneNumber(phone) === false || isPossiblePhoneNumber(phone) === false){
      return 'phone number is invalid! please enter a valid phone number....'
    }
    else{
      return 'ok'
    }
  }


  //ANCHOR signup function 
  const signUp = async () => {
    const check = checkValidation(); 
    if (check === 'ok') {
      dispatch(statusAction.setNotification({
        message: 'signing up please wait',
        type: "loading"
      }))
      const {countryCallingCode, nationalNumber} = parsePhoneNumber(phone)
      
      console.log(countryCallingCode, nationalNumber);
      setIsSigningIn(true);
      const req = {
        name: username,
        password: password,
        email: email,
        countryCode: `+${countryCallingCode}`,
        phoneNumber: nationalNumber,
      };
      try {
        const { data } = await axios
          .post("http://localhost:4000/v1/auth/user/register", req)
          .then((res) => {
            dispatch(statusAction.setNotification({
              message: 'signed in successful',
              type: "success"
            }))
            setIsSigningIn(false);
            console.log('response' + res);
            dispatch(clientActions.setClient(res.data));
          })
          .catch((err) => {
            dispatch(statusAction.setNotification({
              message: err.response.data.message,
              type: "error"
            }))
            alert(err.response.data.message);
            setIsSigningIn(false);
          });
        console.log("---->" + data);
        setClient(data);
      } catch (err) {
        console.error(err);
        setIsSigningIn(false);
      }
    } else {
      dispatch(statusAction.setNotification({
        message: check,
        type: "error"
      }))
    }
  };



  return (
    <div className="signup__form">

      <div className="signup__form__component">
        <RegistrationPageComponent />
      </div>


      <div className="signup__form__inputs">

        <div className="signup__form__inputs__title">
          <h1>Signup as User</h1>
          <p className="signup__form__inputs__title__noaccount-link">
            Don't have an account?
          </p>
        </div>


        <div className="signup__form__inputs__username">
          <label htmlFor="userName">Full name</label>
          <input
            id="userName" type="text" placeholder="Enter your name" value={username} name="username"
            onChange={(e) => 
            {
              setClientName(e.target.value);
            }}
          />
        </div>


        <div className="signup__form__inputs__email">
          <label htmlFor="userEmail">Email</label>
          <input
            id="userEmail"
            type="text"
            placeholder="Enter your email address"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>


        <div className="signup__form__inputs__password">
          <label htmlFor="userPassword">Password</label>
          <input
            id="userPassword"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h5 className = 'password__warning__validation'>Password must be 7 to 15 characters which contain at least one numeric digit and a special character</h5>
        </div>


        <div className="signup__form__inputs__email">
          <label htmlFor="userPhone">Confirm password</label>
          <input
            id="userPhone"
            type="password"
            placeholder="Enter your password again"
            value={repeatPassword}
            name="confirm password"
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </div>


        <div className="signup__form__inputs__phone">
            <label htmlFor="phoneNumber">Phone Number </label>
              <PhoneInput
                  id = 'phoneNumber'
                  defaultCountry = "US"
                  placeholder="Enter phone number"
                  value={phone}
                  className = 'mydetails__update-details__update__phone__phone-number'
                  name = 'phone number'
                  onChange={setPhone}/>   
        </div>


        <label className="signup__form__inputs__login-link" htmlFor="userLogin">
          Already have an Account?{" "}
          <Link
            to="/user/login"
            id="userLogin"
            className="signup__form__inputs__login-link__link"
          >
            Login
          </Link>
        </label>


        <button
          className="signup__form__inputs__button"
          title="sign up"
          onClick={signUp}
        >
          {isSigningIn ? <LoadingIndicator /> : "Signup"}
        </button>


      </div>
    </div>
  );
};

export default SignUpInputs;
