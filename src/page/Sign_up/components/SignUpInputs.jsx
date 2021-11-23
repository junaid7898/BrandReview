import React, { useState } from "react";
import {axios} from "../../../axios/axiosInstance";
import { useHistory, Link } from "react-router-dom";

import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { statusAction } from "../../../Redux/statusSlice";
import PhoneInput from "react-phone-number-input";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

const SignUpInputs = () => {

  // ANCHOR form states
  const [username, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');

  //ANCHOR loading states
  const [isSigningIn, setIsSigningIn] = useState(false);

  // ANCHOR states for redux
  const [user, setClient] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory()
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
    let emailValidation, validPassword;
    if(email){
      emailValidation =  validateEmail();
    }
    if(password){
      validPassword = CheckPassword()
    }
    if(username === null || username === '' || email === null || email === '' || password === null || password === '' || repeatPassword === null || repeatPassword === '' || phone === null || phone === ''){
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
    dispatch(statusAction.setNotification({
      message: 'signing up please wait',
      type: "loading"
    }))
    let ipAddress = ""
    const isError = await axios.get("https://api.ipify.org/?format=JSON")
    .then(({data}) => {
        ipAddress = data
        return false
    })
    .catch(() => {
      dispatch(statusAction.setNotification({
        message: 'failed to obtain IP address',
        type: "error"
      }))
      return  true
    })
    if(isError){
      return
    }
    const check = checkValidation(); 
    if (check === 'ok') {
      const {countryCallingCode, nationalNumber} = parsePhoneNumber(phone)
      console.log(countryCallingCode, nationalNumber);
      setIsSigningIn(true);
      const req = {
        name: username,
        password: password,
        email: email,
        countryCode: `+${countryCallingCode}`,
        phoneNumber: nationalNumber,
        ipAddress
      };
      try {
        const { data } = await axios
          .post("/auth/user/register", req)
          .then((res) => {
            dispatch(statusAction.setNotification({
              message: 'signed in successful',
              type: "success"
            }))
            setIsSigningIn(false);
            console.log('response' + res);
            history.push('/user/login')
          })
          .catch((err) => {
            dispatch(statusAction.setNotification({
              message: err.response.data.message,
              type: "error"
            }))
            setIsSigningIn(false);
          });
        console.log("---->" + data);
        setClient(data);
      } catch (err) {
        console.error(err);
        setIsSigningIn(false);
      }
    } 
    else {
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
