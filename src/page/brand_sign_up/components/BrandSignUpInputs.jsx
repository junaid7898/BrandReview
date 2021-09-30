import React, { useState } from "react";
import axios from "axios";
import BrandLogo from '../../../assests/images/brand_icon.png'
const BrandSignUpInputs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async() => {
    console.log(name, email, password);
    const req = {
      name: name,
      password: password,
      email: email,
      countryCode: "+92",
      phoneNumber: 3019511632,
      about: 'hello! this is test brand',
      logo: BrandLogo
    };
    try {
        console.log('here---->')   
      const { data } = await axios.post(
        "http://localhost:4000/v1/brandAuth/register",
        req
      ).then(res => {
          console.log('actually---->' + res.data)
      }).catch(err => {
        console.log(err.message)
      });
      console.log('.....>' + data)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="brand__signup__inputs">
      <input
        placeholder="name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick = {signup}>signup</button>
    </div>
  );
};

export default BrandSignUpInputs;
