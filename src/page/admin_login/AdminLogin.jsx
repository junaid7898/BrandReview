import React from "react";
import RegistrationPageComponent from "../../components/registration_page_component/RegistrationPageComponent";
import AdminLoginInputs from "./components/AdminLoginInputs";

export const AdminLogin = () => {
  return (
    <div className="login">
      <RegistrationPageComponent />
      <AdminLoginInputs />  
    </div>
  );
};
