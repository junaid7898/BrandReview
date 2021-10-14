import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { userActions } from "../../../Redux/user slice/userSlice";
import { useDispatch } from "react-redux";

const SignUpInputs = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // const [OTP] = useState(null);
  const [user, setUser] = useState(null);
  console.log(user);
  const dispatch = useDispatch();

  const signUp = async () => {
    console.log(username, email, password, phone);
    const req = {
      name: username,
      password: password,
      email: email,
      countryCode: "+92",
      phoneNumber: 3355114846,
    };
    try {
      const { data } = await axios
        .post("http://localhost:4000/v1/auth/register", req)
        .then((res) => {
          console.log(res);
          dispatch(userActions.setUser(res.data));
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      console.log("---->" + data);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup__form">
      <RegistrationPageComponent />
      <div className="signup__form__inputs">
        <div className="signup__form__inputs__title">
          <h1>Sign Up As User</h1>
          <p className="signup__form__inputs__title__noaccount-link">
            Don't have an account?
          </p>
        </div>
        <div className="signup__form__inputs__username">
          <label htmlFor = 'userName'>Full name</label>
          <input
            id = 'userName'
            type="text"
            placeholder="Enter your name"
            value={username}
            name = 'username'
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="signup__form__inputs__email">
          <label htmlFor = 'userEmail'>Email</label>
          <input
            id = 'userEmail'
            type="text"  
            placeholder="Enter your email address"
            value={email}
            name = 'email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="signup__form__inputs__password">
          <label htmlFor = 'userPassword'>Password</label>
          <input
            id = 'userPassword'
            type = 'password'
            placeholder="Enter your password"
            name = 'password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="signup__form__inputs__phone">
          <label htmlFor = 'userPhone'>Phone number</label>
          <input
            id = 'userPhone'
            type="text"
            placeholder="Enter your phone Number"
            value={phone}
            name = 'phone number'
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <label className="signup__form__inputs__login-link" htmlFor="userLogin">
          Already have an Account? <Link to="/login" id = 'userLogin' className = 'signup__form__inputs__login-link__link'>Login</Link>
        </label>
        <button
          className="signup__form__inputs__button"
          title="sign up"
          onClick={signUp}
        >
          Signup
        </button>
      </div>

      {/* <div className="signup__form__verification-buttons">
        <button onClick={verifyEmail}>Verify Email</button>
        <button onClick={verifyPhone}>Verify Phone</button>
      </div>

      <SignUpOtpVerification sendOTP={sendOTP} value={OTP} setValue={setOTP} /> */}
    </div>
  );
};

export default SignUpInputs;
