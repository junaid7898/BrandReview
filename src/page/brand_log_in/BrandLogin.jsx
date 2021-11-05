import React from "react";
import RegistrationPageComponent from "../../components/registration_page_component/RegistrationPageComponent";
import BlueSpiralBackground from "../login/components/BlueSpiralBackground";
import SpiralBackground from "../login/components/SpiralBackground";
import VerticalDotBackGround from "../login/components/VerticalDotBackGround";
import ZigZagBackgroundComponent from "../login/components/ZigZagBackgroundComponent";
import BrandLoginInputs from "./components/BrandLoginInputs";

const BrandLogin = () => {
  return (
    <div className = 'brand__login'>
    <div className="brand__login__component">
      <RegistrationPageComponent />
    </div>
      <BrandLoginInputs /> 
        <div className = 'login__dots-vertical-background'>
            <VerticalDotBackGround/>
        </div>

        <div className = 'login__dots-vertical-background2'>
            <VerticalDotBackGround/>
        </div>

        <div className = 'login__zig-zag-background'>
            <ZigZagBackgroundComponent/>
        </div>

        <div className = 'login__spiral-background'>
            <SpiralBackground/>
        </div>
        <div className = 'login__blue-spiral-background'>
            <BlueSpiralBackground/>
        </div>        
    </div>
  );
};

export default BrandLogin;
