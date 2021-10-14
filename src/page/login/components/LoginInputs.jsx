import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import GoogleIcon from "../../../assests/icons/googleIcon.png";
import FacebookIcon from "../../../assests/icons/facebookIcon.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import {useGoogleLogin} from 'react-google-login'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
const LoginInputs = () => {
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
      const {data:user} = await axios.post("http://localhost:4000/v1/auth/user/login/google",{
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
    console.log("login")
    const req = {
      email,
      password
    };
    try {
      setIsLoggingIn({...isLoggingIn, email: true})
        axios.post(
        "http://localhost:4000/v1/auth/user/login",
        req
      ).then(res => {
        console.log(res)
          const {payload} = dispatch(clientActions.setClient(res.data))
          console.log(payload)
          if(rememberMe){
            localStorage.setItem('userId', payload.user.id )
            localStorage.setItem('accessToken', payload.tokens.access.token)
          }
          setIsLoggingIn({...isLoggingIn, email: false})
          history.push('/')
      }).catch(err => {
        alert(err.response.data.message)
        setIsLoggingIn({...isLoggingIn, email: false})
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login__form__inputs">
      <div className="login__form__inputs__title">
        <h1>Sign In As User</h1>
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

      <label className="login__form__inputs__login-link" htmlFor="userSignup">
          Don't have an account? <Link to="/signup" id = 'userSignup' className = 'login__form__inputs__login-link__link'>Singup</Link>
        </label>

      <button
        className="login__form__inputs__button"
        disabled = {isLoggingIn.email}
        onClick={login}
      >
        {isLoggingIn.email ? <LoadingIndicator /> : "Login"}
      </button>
      <p>or continue with</p>
      <div className="login__form__inputs__social-button">
        <div onClick={loginWithGoogle} style={{pointerEvents: isLoggingIn.google ? "none" : "all"}} className="login__form__inputs__social-button__google">

          <img src={GoogleIcon} alt="google logo" />
          <p>{isLoggingIn.google ? <LoadingIndicator /> : "Sign in with Google"}</p>
        </div>
        <div  className="login__form__inputs__social-button__facebook" onClick = {() => alert('sign in with facebook')}>
          <img src={FacebookIcon} alt="facebook logo" />
          <p>{isLoggingIn.facebook ? <LoadingIndicator /> :  "Sign in with Facebook"}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginInputs;
