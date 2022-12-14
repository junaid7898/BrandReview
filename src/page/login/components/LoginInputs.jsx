import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import GoogleIcon from "../../../assests/icons/googleIcon.png";
import FacebookIcon from "../../../assests/icons/facebookIcon.png";
import {axios} from "../../../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import {useGoogleLogin} from 'react-google-login'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import {statusAction} from "../../../Redux/statusSlice"
import ForgotPassword from "../../../components/forgot_password/ForgotPassword";

const LoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState({
    email: false,
    google: false,
    facebook: false
  })

  const [forgotPassword, setForgotPassword] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const clientId = "29070885149-iipqn1acl0b33hh09fi9ns1tasangr9f.apps.googleusercontent.com"
  
    const onSuccess = async({profileObj}) =>{
      console.log(profileObj)  
      const {data:user} = await axios.post("/auth/user/login/google",{
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

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      login()
    }
  }

  const login = async () => {
    dispatch(statusAction.setNotification({
      message: "Giri?? Yap L??tfen bekleyin",
      type: "loading"
    }))
    console.log("login")
    const req = {
      email,
      password
    };
    try {
      setIsLoggingIn({...isLoggingIn, email: true})
        axios.post(
        "/auth/user/login",
        req
        ).then(res => {
          dispatch(statusAction.setNotification({
            message: "Giri?? Yap??ld??",
            type: "success"
          }))
          console.log('response: ' , res.data)
            const {payload} = dispatch(clientActions.setClient(res.data))
            console.log(payload)
            if(rememberMe){
              localStorage.setItem('remember', "-")
            }
            localStorage.setItem('userId', payload.user.id )
            localStorage.setItem('accessToken', payload.tokens.access.token)
            localStorage.setItem('clientType', "user")
            setIsLoggingIn({...isLoggingIn, email: false})
            history.push('/')
        }).catch(err => {
          dispatch(statusAction.setNotification({
            message: err.response.data.message,
            type: "error"
          }))
          setIsLoggingIn({...isLoggingIn, email: false})
        });
    } catch (err) {
      console.error(err);
    }
  };

  //ANCHOR handle forgot password here
  const handleForgotPassword = (emailAddress) => {
    //emailAddress contains the email
    axios.post('/auth/user/forgot-password/',{
      email: emailAddress,
      type: "user"
    })
    .then((_) =>{
      console.log("success")
    })
    .catch(err =>{
      console.log(err)
    })
    alert(`forgot password with ${emailAddress}...`)
  }

  return (
    <form className="login__form__inputs" onSubmit = {(e) => {
      e.preventDefault()
      login()
    }}>
      <div className="login__form__inputs__title">
        <h1>Kullan??c?? Girisi</h1>
        <p className="login__form__inputs__title__noaccount-link">
          Ho??geldiniz
        </p>
      </div>

      <div className="login__form__inputs__email">
        <label htmlFor = "userName">Email Adresiniz</label>
        <input
          id = "userName"
          type="email"
          name="email"
          placeholder="Email Adresinizi Yaz??n??z"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="login__form__inputs__password">
        <label htmlFor = "userPassword">??ifreniz</label>
        <input
          id = "userPassword"
          type="password"
          name="password"
          placeholder="??ifrenizi girin"
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
          <label htmlFor="saveUserInfo">Beni Hat??rla</label>
        </div>
        <div className = 'login__form__inputs__after__forgot-password' onClick = {() => setForgotPassword(true)}>
          <p>??ifremi Unuttum?</p>
        </div>
        {
          forgotPassword ? 
            <div className="login__form__inputs__after__forgot-component">
              <ForgotPassword onCancel = {setForgotPassword} onSubmit = {(emailAddress) => handleForgotPassword(emailAddress)}/>
            </div>
          :
            null
        }
       
      </div>

      <label className="login__form__inputs__login-link" htmlFor="userSignup">
        Hen??z ??ye De??il misiniz? <Link to="/user/signup" id = 'userSignup' className = 'login__form__inputs__login-link__link'>??ye Ol</Link>
        </label>

      <button
        className="login__form__inputs__button"
        disabled = {isLoggingIn.email}
        // onClick={login}
        type = 'submit'
        onKeyDown = {handleKeyDown}
      >
        Giri??
        {
          isLoggingIn.email &&
          <LoadingIndicator />
        }
      </button>
      <p>veya devam et</p>
      <div className="login__form__inputs__social-button">
        <div onClick={loginWithGoogle} style={{pointerEvents: isLoggingIn.google ? "none" : "all"}} className="login__form__inputs__social-button__google">
          <img src={GoogleIcon} alt="google logo" />

          <p>Google Hesab??n??zla Giri??</p>
          
        </div>
        {/* <div  className="login__form__inputs__social-button__facebook" onClick = {() => alert('sign in with facebook')}>
          <img src={FacebookIcon} alt="facebook logo" />
          <p>Sign in with Facebook</p>
          {
            isLoggingIn.facebook &&
            <LoadingIndicator />
          }
        </div> */}
      </div>
    </form>
  );
};

export default LoginInputs;
