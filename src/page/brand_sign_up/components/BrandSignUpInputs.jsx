import React, { useState } from "react";
import axios from "axios";
import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { Link } from "react-router-dom";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import { useDispatch } from "react-redux";
import { getImageDetails } from "../../../helpers/getImageDetails";
import {useHistory} from 'react-router'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";

import PhoneInput from "react-phone-number-input";
import {
  isPossiblePhoneNumber,
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";


const BrandSignUpInputs = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  // ANCHOR form states
  const [username, setClientName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);
  const [rawLogo, setRawLogo] = useState(null)
  const [about, setAbout] = useState(null)
  const [characterCount, setCharacterCount] = useState(0)
  const [imageDetails, setImageDetails] = useState(null)
  //ANCHOR loading states
  const [isSigningIn, setIsSigningIn] = useState(false);

  // ANCHOR states for redux
  const [user, setClient] = useState(null);


  //ANCHOR email validation
  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  // ANCHOR validation function for form
  const checkValidation = () => {
      const emailValidation =  validateEmail();
     if(username === null || email === null || password === null || repeatPassword === null || phone === null || about === null){
        return 'please fill all entries'
      }
    else if(emailValidation === false){
      return 'please enter a valid email'
    }

    else if(brandLogo === null){
      return 'please upload a brand logo'
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


  //TODO handle logo selection method
  const handleFileSelect = (e) => {

    const image = e.target.files[0]
    console.log(image);
    if (e.target.files && image) {
      setBrandLogo(URL.createObjectURL(image))
    }
    else{
      alert('please select a logo for your brand')
    }
  }


  const signup = async() => {
    const check = checkValidation()
    if(check === 'ok'){
      const {countryCallingCode, nationalNumber} = parsePhoneNumber(phone)
      
      console.log(countryCallingCode, nationalNumber);
      setIsSigningIn(true);
      const req = {
        name: username,
        password: password,
        email: email,
        countryCode: `+${countryCallingCode}`,
        phoneNumber: nationalNumber,
        about: about,
      };
      console.log(imageDetails)
      await axios.post(
        "http://localhost:4000/v1/auth/brand/register",{
          brand:req,
          logoDetails: imageDetails
        }).then(({data}) => {
          axios.put(data.url, rawLogo, {
            headers:{
              'Content-Type' : imageDetails.fileType
            }
          })
          .then((_) => {
            dispatch(clientActions.setClient(data.brand))
            history.push("/")
            setIsSigningIn(false)
          })
          
      }).catch(err => {
        alert(err.message)
        setIsSigningIn(false)
      })
    }
    else{
      alert(check)
    }
  };

  const handleImage = (e) =>{
    console.log(brandLogo)
    const g = getImageDetails(e.target.files[0])
    if(!g){
      e.target.value = null
      return 
    }
    setImageDetails(g)
    if(g){
      setBrandLogo(URL.createObjectURL(e.target.files[0]))
      setRawLogo(e.target.files[0])
    }
    else{
      setBrandLogo(null)
      setRawLogo(null)
      setImageDetails(null)
    }
    
  }

  const handleImageClick = (e) =>{
    e.target.value = null
    setRawLogo(null)
    setBrandLogo(null)
    setImageDetails(null)
  }

  return (
    <div className="signup__form">


      <RegistrationPageComponent />


      <div className="signup__form__inputs">

        <div className="signup__form__inputs__title">
          <h1>Signup as Brand</h1>
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

        <div className="signup__form__inputs__email">
          <label htmlFor="brandLogo">Brand Logo</label>
          <input
            id="brandLogo"
            type='file'
            placeholder="Select a brand logo for your brand"
            accept = 'image/*'
            name="image"
            onClick={ handleImageClick}
            onChange={handleImage}
          />
          { brandLogo ? ( <img src = {brandLogo} style = {{height: 100, marginTop: 10}}/> ):(null)}
        </div>

        <div className="signup__form__inputs__email">
          <label htmlFor="brandAbout">About your Brand {` [100 / ${characterCount}] `}</label>
          <input
            id="brandAbout"
            type='text'
            placeholder="What is your brand about? maximum of 100 characters"
            name="about"
            maxLength = {100}
            value = {about}
            onChange={(e) => {
              setCharacterCount(e.target.value.length)
              setAbout(e.target.value)
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
            to="/brand/login"
            id="userLogin"
            className="signup__form__inputs__login-link__link"
          >
            Login
          </Link>
        </label>
        <button
          className="signup__form__inputs__button"
          title="sign up"
          onClick={signup}
          style={{position:"relative"}}
        >
          Signup
          {
            isSigningIn && <LoadingIndicator />
          }
        </button>


      </div>
    </div>
  );
};

export default BrandSignUpInputs;
