import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import GoogleIcon from "../../../assests/icons/googleIcon.png";
import FacebookIcon from "../../../assests/icons/facebookIcon.png";

import { useDispatch } from "react-redux";
import { userActions } from "../../../Redux/user slice/userSlice";

const BrandLoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const login = async () => {
    console.log(email, password);
    const req = {
      email: email,
      password: password,
    };
    try {
      await axios
        .post("http://localhost:4000/v1/brandAuth/login", req)
        .then((res) => {
          console.log(res);
          dispatch(userActions.setBrand(res.data));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="brand__login__inputs">
      <div className="brand__login__inputs__title">
        <h1>Sign In as Brand</h1>
        <p className="brand__login__inputs__title__noaccount-link">
          Welcome, we missed you
        </p>
      </div>

      <div className="brand__login__inputs__email">
        <label for="userName">Your Email</label>
        <input
          id="userName"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="brand__login__inputs__password">
        <label for="userPassword">Password</label>
        <input
          id="userPassword"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="brand__login__inputs__after">
        <div className="login__form__inputs__after__checkbox">
          <input
            id="saveUserInfo"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => {
              if (rememberMe) {
                setRememberMe(false);
              } else {
                setRememberMe(true);
              }
            }}
          />
          <label htmlFor="saveUserInfo">Remember me</label>
        </div>
        <Link to="" className="brand__login__inputs__after__link">
          Forgot Password?
        </Link>
      </div>

      <button
        className="brand__login__inputs__button"
        title="sign up"
        onClick={login}
      >
        Sign UP
      </button>
      <p>or continue with</p>
      <div className="brand__login__inputs__social-button">
        <div className="brand__login__inputs__social-button__google">
          <img src={GoogleIcon} alt="google logo" />
          <p>Sign in with Google</p>
        </div>
        <div className="brand__login__inputs__social-button__facebook">
          <img src={FacebookIcon} alt="facebook logo" />
          <p>Sign in with Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default BrandLoginInputs;
