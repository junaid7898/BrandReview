import React, { useState } from "react";
import axios from "axios";
import BrandLogo from '../../../assests/images/brand_icon.png'
import RegistrationPageComponent from "../../../components/registration_page_component/RegistrationPageComponent";
import { Link } from "react-router-dom";
import { clientActions } from "../../../Redux/clientslice/clientSlice";
import { useDispatch } from "react-redux";
import { getImageDetails } from "../../../helpers/getImageDetails";
const BrandSignUpInputs = () => {
  const [username, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null)
  const [imageDetails, setImageDetails] = useState({})
  let isPasswordMatch = false;
  const dispatch = useDispatch()


  const signup = async() => {
    console.log(username, email, password);
    if(isPasswordMatch){
      alert("passowrd dont match")
      return
    }
    const req = {
      brand: {
        name: username,
        password,
        email,
        countryCode: "+92",
        phoneNumber: phone,
        about
      },
      imageDetails
    }; 
    await axios.post(
      "http://localhost:4000/v1/auth/brand/register",
      req
    ).then(({data}) => {
        dispatch(clientActions.setClient(data))
        axios.put(data.brand.logo, image, {
          headers:{
            'Content-Type' : imageDetails.fileType
          }
      })
    }).catch(err => {
      console.log(err.message)
    });
  };


  const handleImage = (e) =>{

    const g = getImageDetails(e.target.files[0])
    if(g){
      e.target.value = null
      return 
    }
    setImageDetails(g)
    if(g){
      setImage(e.target.files[0])
    }
    else{
      setImage(null)
    }
    
  }

  const checkPassword = (e) =>{

    if(e !== password){
      isPasswordMatch = false
      console.log("wrong password")
    }
    else{
      isPasswordMatch = true
      console.log("correct")
    }

  }
  return (
    <div className="brand__signup__form">
      <RegistrationPageComponent/>
      <div className="brand__signup__form__inputs">
        <div className="brand__signup__form__inputs__title">
          <h1>Signup as Brand</h1>
          <Link to="/brand/login" className="brand__signup__form__inputs__title__noaccount-link">
            Already Have an account?
          </Link>
        </div>
        <div className="brand__signup__form__inputs__username">
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
        <div className="brand__signup__form__inputs__email">
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
        <div className="brand__signup__form__inputs__password">
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
        <div className="brand__signup__form__inputs__password">
          <label>Confirm Password</label>
          <input
            type="text"
            placeholder="Enter your password again to confirm"
            onChange={(e) => {
              checkPassword(e.target.value);
            }}
          />
        </div>
        <div className="brand__signup__form__inputs__phone">
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
        <div className="brand__signup__form__inputs__phone">
          <label>Brand Logo</label>
          <input
            type="file"
            accept="image/*"
            onClick={ (e) => e.target.value=null}
            onChange={handleImage}
          />
        </div>
        <div className="brand__signup__form__inputs__phone">
          <label>About</label>
          <textarea
            type="text"
            placeholder="Tell people about yourself"
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
        </div>
        <button
          className="brand__signup__form__inputs__button"
          onClick={signup}
        >
          Signup
        </button>
      </div>
      </div>
  );
};

export default BrandSignUpInputs;
