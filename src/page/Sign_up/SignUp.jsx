import React, { useState } from "react";
import axios from 'axios'
const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [OTP, setOTP] = useState(null)
  const [user, setUser] = useState(null)

  const signUp = async() => {
    console.log(username, email, password, phone);
    const req = {
      name: "Junaid",
      password: "junaid123",
      email: "junaidnaqeer@gmail.com",
      countryCode:"+92",
      phoneNumber: 3355114846
    }
    try{
      const {data} = await axios.post("http://localhost:4000/v1/auth/register",req)
      console.log(data)
      setUser(data)
    }
    catch(err){
      console.error(err)
    }
  };

  const verifyPhone = async() => {

    try{
      const {data} = await axios.post("http://localhost:4000/v1/auth/send-verification-sms",user,{
        headers:{
          "Authorization" : `bearer ${user.tokens.access.token}`
        }
      })
      console.log(data)
    }
    catch(err){
      console.error(err)
    }

  }

  const sendOTP = async() => {

    try{
      const {data} = await axios.post(`http://localhost:4000/v1/auth/verify-phone?OTPCode=${OTP}`,user,{
        headers:{
          "Authorization" : `bearer ${user.tokens.access.token}`
        }
      })
      console.log(data)
    }
    catch(err){
      console.error(err)
    }

  }

  const verifyEmail = async () =>{
    try{
      const {data} = await axios.post("http://localhost:4000/v1/auth/send-verification-email",user,{
        headers:{
          "Authorization" : `bearer ${user.tokens.access.token}`
        }
      })
      console.log(data)
    }
    catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="phone Number"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <button title="sign up" onClick={signUp}>
        Sign UP
      </button>
      <button onClick = {verifyEmail}>
        Verify Email
      </button>
      <button onClick = {verifyPhone}>
        Verify Phone
      </button>
      <h1>Enter OTP</h1>
      <input
        type="text"
        placeholder="phone Number"
        value={OTP}
        maxLength={4}
        onChange={(e) => {
          setOTP(e.target.value);
        }}
      />
      <button onClick={sendOTP}>send otp</button>
    </div>
  );
};

export default SignUp;
