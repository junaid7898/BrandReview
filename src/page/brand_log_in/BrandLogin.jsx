import React from "react";
import RegistrationPageComponent from "../../components/registration_page_component/RegistrationPageComponent";
import BrandLoginInputs from "./components/BrandLoginInputs";

const BrandLogin = () => {
  return (
    <div className = 'brand__login'>
      <RegistrationPageComponent />
      <BrandLoginInputs />         
    </div>
  );
};

export default BrandLogin;
