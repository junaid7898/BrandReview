import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../../../assests/icons/googleIcon.png";
import FacebookIcon from "../../../assests/icons/facebookIcon.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../../Redux/user slice/userSlice";

const LoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch()
  
  const login = async () => {
    const req = {
      email,
      password
    };
    try {
        axios.post(
        "http://localhost:4000/v1/auth/login",
        req
      ).then(res => {
        console.log(res)
          dispatch(userActions.setUser(res.data))
      }).catch(err => {
        alert(err.response.data.message)
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login__form__inputs">
      <div className="login__form__inputs__title">
        <h1>Sign In</h1>
        <p className="login__form__inputs__title__noaccount-link">
          Welcome, we missed you
        </p>
      </div>

      <div className="login__form__inputs__email">
        <label for = "userName">Your Email</label>
        <input
          id = "userName"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="login__form__inputs__password">
        <label for = "userPassword">Password</label>
        <input
          id = "userPassword"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="login__form__inputs__after">
        <div className="login__form__inputs__after__checkbox">
          <input
            id = "saveUserInfo"
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
        <Link to="" className="login__form__inputs__after__link">
          Forgot Password?
        </Link>
      </div>

      <button
        className="login__form__inputs__button"
        title="sign up"
        onClick={login}
      >
        Sign UP
      </button>
      <p>or continue with</p>
      <div className="login__form__inputs__social-button">
        <div className="login__form__inputs__social-button__google">
          <img src={GoogleIcon} />
          <p>Sign in with Google</p>
        </div>
        <div className="login__form__inputs__social-button__facebook">
          <img src={FacebookIcon} />
          <p>Sign in with Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default LoginInputs;
