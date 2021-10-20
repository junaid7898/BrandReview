import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import GoogleIcon from "../../../assests/icons/googleIcon.png";
import FacebookIcon from "../../../assests/icons/facebookIcon.png";
import { useDispatch } from "react-redux";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import {useGoogleLogin} from 'react-google-login'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
const BrandLoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState({
    email: false,
    google: false,
    facebook: false
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const clientId = "29070885149-iipqn1acl0b33hh09fi9ns1tasangr9f.apps.googleusercontent.com"
  
    const onSuccess = async({profileObj}) =>{
      console.log(profileObj)  
      const {data:user} = await axios.post("http://localhost:4000/v1/auth/brand/login/google",{
          user:{
            name:profileObj.name,
            password:profileObj.googleId,
            email:profileObj.email,
            profileImage:profileObj.imageUrl
          }
      })
      setIsLoggingIn({...isLoggingIn, google: false})
      dispatch(clientActions.setClient(user))
      history.push('/')
    }
    const onFailure = () =>{
      alert("Login Failed")
      setIsLoggingIn({...isLoggingIn, google: false})
    }

  const {signIn: googleLogin} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
    })

  const loginWithGoogle =() =>{
    setIsLoggingIn({...isLoggingIn, google: true})
    googleLogin()
  }

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
          alert(err.response.data.message);
          setIsLoggingIn(false)
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

      <label className="login__form__inputs__login-link" htmlFor="userSignup">
          Don't have an account? <Link to="/brand/signup" id = 'userSignup' className = 'login__form__inputs__login-link__link'>Signup</Link>
      </label>

      <button
        className="login__form__inputs__button"
        disabled = {isLoggingIn.email}
        onClick={login}

        disabled = {isLoggingIn}
        style={{position:"relative"}}
      >
        Login
        {
          isLoggingIn && <LoadingIndicator />
        }
      </button>

      <p>or continue with</p>
      <div className="login__form__inputs__social-button">
        <div onClick={loginWithGoogle} style={{pointerEvents: isLoggingIn.google ? "none" : "all"}} className="login__form__inputs__social-button__google">

          <img src={GoogleIcon} alt="google logo" />
          <p>{isLoggingIn.google ? <LoadingIndicator/> : "Login with Google"}</p>

        </div>
        <div  className="login__form__inputs__social-button__facebook" onClick = {() => alert('sign in with facebook')}>
          <img src={FacebookIcon} alt="facebook logo" />
          <p>{isLoggingIn.facebook ? <LoadingIndicator /> :  "Login with Facebook"}</p>
        </div>
      </div>


    </div>
  );
};

export default BrandLoginInputs;
