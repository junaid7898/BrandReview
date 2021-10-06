import React, { useState } from "react";
import axios from "axios";
import BrandLogo from '../../../assests/images/brand_icon.png'
import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { Link } from "react-router-dom";
const BrandSignUpInputs = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState(null);
  const [user, setUser] = useState(null);


  const signup = async() => {
    console.log(username, email, password);
    const req = {
      name: username,
      password: password,
      email: email,
      countryCode: "+92",
      phoneNumber: 3004444444,
      about: 'hello! this is test brand, we are currently working on our main module.',
      logo: BrandLogo
    };
    try {
        console.log('here---->')   
      const { data } = await axios.post(
        "http://localhost:4000/v1/brandAuth/register",
        req
      ).then(res => {
          console.log('actually---->' + res.data)
      }).catch(err => {
        console.log(err.message)
      });
      console.log('.....>' + data)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="brand__signup__form">
      <RegistrationPageComponent/>
      <div className="brand__signup__form__inputs">
        <div className="brand__signup__form__inputs__title">
          <h1>Sign Up as Brand</h1>
          <Link className="brand__signup__form__inputs__title__noaccount-link">
            Don't have an account?
          </Link>
        </div>
        <div className="brand__signup__form__inputs__username">
          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="brand__signup__form__inputs__email">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="brand__signup__form__inputs__password">
          <label>Password</label>
          <input
            type="text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="brand__signup__form__inputs__phone">
          <label>Phone number</label>
          <input
            type="text"
            placeholder="Enter your phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <button
          className="brand__signup__form__inputs__button"
          title="sign up"
          onClick={signup}
        >
          Sign UP
        </button>
      </div>
      </div>
  );
};

export default BrandSignUpInputs;
