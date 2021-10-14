import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
// import GoogleIcon from "../../../assests/icons/googleIcon.png";
// import FacebookIcon from "../../../assests/icons/facebookIcon.png";
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { useDispatch } from "react-redux";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
const BrandLoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory()
  const login = async () => {
    setIsLoggingIn(true)
    console.log(email, password);
    const req = {
      email: email,
      password: password,
    };
      axios
        .post("http://localhost:4000/v1/auth/brand/login", req)
        .then(({data}) => {
          const {payload} = dispatch(clientActions.setClient(data));
          if(rememberMe){
            console.log(payload)
            localStorage.setItem('brandId', payload.brand.id )
            localStorage.setItem('accessToken', payload.tokens.access.token)
            localStorage.setItem('clientType', payload.type)
          }
          setIsLoggingIn(false)
          history.push('/')
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="brand__login__inputs">
      <div className="brand__login__inputs__title">
        <h1>Login as Brand</h1>
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
        onClick={login}
        disabled = {isLoggingIn}
      >
        {isLoggingIn ? <LoadingIndicator /> : "Login"}
      </button>
      <Link to="/brand/signup">
            Dont have an account ?
      </Link>
    </div>
  );
};

export default BrandLoginInputs;
