import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import { useDispatch } from "react-redux";

const SignUpInputs = () => {
  const [username, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // const [OTP] = useState(null);
  const [user, setClient] = useState(null);
  console.log(user)
  const dispatch = useDispatch()

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
      const { data } = await axios.post(
        "http://localhost:4000/v1/auth/user/register",
        req
      ).then(res => {
        console.log(res)
          dispatch(clientActions.setClient(res.data))
      }).catch(err => {
        alert(err.response.data.message)
      });
      console.log('---->'+data);
      setClient(data);
    } catch (err) {
      console.error(err);
    }
  };

  // const verifyPhone = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:4000/v1/auth/send-verification-sms",
  //       user,
  //       {
  //         headers: {
  //           Authorization: `bearer ${user.tokens.access.token}`,
  //         },
  //       }
  //     );
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const sendOTP = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `http://localhost:4000/v1/auth/verify-phone?OTPCode=${OTP}`,
  //       user,
  //       {
  //         headers: {
  //           Authorization: `bearer ${user.tokens.access.token}`,
  //         },
  //       }
  //     );
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const verifyEmail = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:4000/v1/auth/send-verification-email",
  //       user,
  //       {
  //         headers: {
  //           Authorization: `bearer ${user.tokens.access.token}`,
  //         },
  //       }
  //     );
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div className="signup__form">
      <RegistrationPageComponent/>
      <div className="signup__form__inputs">
        <div className="signup__form__inputs__title">
          <h1>Sign Up</h1>
          <Link className="signup__form__inputs__title__noaccount-link">
            Don't have an account?
          </Link>
        </div>
        <div className="signup__form__inputs__username">
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
        <div className="signup__form__inputs__email">
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
        <div className="signup__form__inputs__password">
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
        <div className="signup__form__inputs__phone">
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
          className="signup__form__inputs__button"
          title="sign up"
          onClick={signUp}
        >
          Sign UP
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
