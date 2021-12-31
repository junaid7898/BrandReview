import React, { useState } from "react";
import {axios} from "../../../axios/axiosInstance";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import GoogleIcon from "../../../assests/icons/googleIcon.png";
import FacebookIcon from "../../../assests/icons/facebookIcon.png";
import { useDispatch } from "react-redux";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import {useGoogleLogin} from 'react-google-login'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { statusAction } from "../../../Redux/statusSlice";
import ForgotPassword from "../../../components/forgot_password/ForgotPassword";
const BrandLoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isForgotPasswordSending, setIsForgotPasswordSending] = useState(false) 
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
      const {data:user} = await axios.post("/auth/brand/login/google",{
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
    dispatch(statusAction.setNotification({
      message: "Giriş Yap Lütfen bekleyin",
      type: "loading"
    }))
    setIsLoggingIn(true)
    console.log(email, password);
    const req = {
      email: email,
      password: password,
    };
      axios
        .post("/auth/brand/login", req)
        .then(({data}) => {
          dispatch(statusAction.setNotification({
            message: "Giriş Yapıldı",
            type: "success"
          }))
          const {payload} = dispatch(clientActions.setClient(data));
          if(rememberMe){
            console.log(payload)
            localStorage.setItem("remember", "-")
          }
          localStorage.setItem('brandId', payload.brand.id )
          localStorage.setItem('accessToken', payload.tokens.access.token)
          localStorage.setItem('clientType', payload.type)
          setIsLoggingIn(false)
          history.push('/')
        })
        .catch((err) => {
          console.log(err)
          dispatch(statusAction.setNotification({
            message: err.response.data.message,
            type: "error"
          }))
          // alert(err.response.data.message);
          setIsLoggingIn(false)
        });
  };
//ANCHOR here handle forgot password
  const handleForgotPassword = (emailAddress) => {
    //emailAddress contains the email
    setIsForgotPasswordSending(true)
    axios.post('/auth/brand/forgot-password/',{
      email: emailAddress,
      type: "brand"
    })
    .then((_) =>{
      dispatch(statusAction.setNotification({
        message: `Reset Email Send to ${emailAddress}`,
        type: "success"
      }))
      setIsForgotPasswordSending(false)
      setForgotPassword(false)
    })
    .catch(err =>{
      console.log(err)
      setIsForgotPasswordSending(false)
      dispatch(statusAction.setNotification({
        message: err.response.data.message,
        type: "error"
      }))
    })
  }

  

  return (
    <form className="brand__login__inputs" onSubmit = {(e) => {
      e.preventDefault()
      login()
    }}>
      <div className="brand__login__inputs__title">
        <h1>Marka Girisi</h1>
        <p className="brand__login__inputs__title__noaccount-link">
          Hoşgeldiniz
        </p>
      </div>

      <div className="brand__login__inputs__email">
        <label for="userName">Email Adresiniz</label>
        <input
          id="userName"
          type="email"
          name="email"
          placeholder="Email Adresinizi Giriniz"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="brand__login__inputs__password">
        <label for="userPassword">Şifreniz</label>
        <input
          id="userPassword"
          type="password"
          name="password"
          placeholder="Şifrenizi Giriniz"
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
          <label htmlFor="saveUserInfo">Beni Hatırla</label>
        </div>
        <div className = 'login__form__inputs__after__forgot-password' onClick = {() => setForgotPassword(true)}>
          <p>Şifremi Unuttum?</p>
        </div>
        {
          forgotPassword ? 
            <div className="login__form__inputs__after__forgot-component">
              <ForgotPassword isSending={isForgotPasswordSending} onCancel = {setForgotPassword} onSubmit = {(emailAddress) => handleForgotPassword(emailAddress)}/>
            </div>
          :
            null
        }
      </div>

      <label className="login__form__inputs__login-link" htmlFor="userSignup">
        Henüz Üye Değil misiniz? <Link to="/brand/signup" id = 'userSignup' className = 'login__form__inputs__login-link__link'>Üye Ol</Link>
      </label>

      <button
        className="login__form__inputs__button"
        // onClick={login}
        type = 'submit'
        disabled = {isLoggingIn.email}
        style={{position:"relative"}}
      >
        Giriş
        {
          isLoggingIn.email && <LoadingIndicator />
        }
      </button>

      {/* <p>or continue with</p>
      <div className="login__form__inputs__social-button">
        <div onClick={loginWithGoogle} style={{pointerEvents: isLoggingIn.google ? "none" : "all"}} className="login__form__inputs__social-button__google">

          <img src={GoogleIcon} alt="google logo" />
          <p>{isLoggingIn.google ? <LoadingIndicator/> : "Login with Google"}</p>

        </div>
        <div  className="login__form__inputs__social-button__facebook" onClick = {() => alert('sign in with facebook')}>
          <img src={FacebookIcon} alt="facebook logo" />
          <p>{isLoggingIn.facebook ? <LoadingIndicator /> :  "Login with Facebook"}</p>
        </div>
      </div> */}


    </form>
  );
};

export default BrandLoginInputs;
