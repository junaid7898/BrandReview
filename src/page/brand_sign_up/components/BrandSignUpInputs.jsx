import React, { useState } from "react";
import axios from "axios";
import BrandLogo from '../../../assests/images/brand_icon.png'
import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { Link } from "react-router-dom";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import { useDispatch } from "react-redux";
const BrandSignUpInputs = () => {
  const [username, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch()


  const signup = async() => {
    console.log(username, email, password);
    const req = {
      name: username,
      password: password,
      email: email,
      countryCode: "+92",
      phoneNumber: phone,
      logo: BrandLogo
    }; 
    await axios.post(
      "http://localhost:4000/v1/brandauth/user/register",
      req
    ).then(res => {
        dispatch(clientActions.setClient(res.data))
    }).catch(err => {
      console.log(err.message)
    });
  };
  return (
    <div className="brand__signup__form">
      <RegistrationPageComponent/>
      <div className="brand__signup__form__inputs">
        <div className="brand__signup__form__inputs__title">
          <h1>Signup as Brand</h1>
          <Link to="/brand/login" className="brand__signup__form__inputs__title__noaccount-link">
            Already Have an account?
          </Link>
        </div>
        <div className="brand__signup__form__inputs__username">
          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => {
              setClientName(e.target.value);
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
          onClick={signup}
        >
          Signup
        </button>
      </div>
      </div>
  );
};

export default BrandSignUpInputs;
