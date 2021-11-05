import React from "react";
import BlueSpiralBackground from "../login/components/BlueSpiralBackground";
import SpiralBackground from "../login/components/SpiralBackground";
import VerticalDotBackGround from "../login/components/VerticalDotBackGround";
import ZigZagBackgroundComponent from "../login/components/ZigZagBackgroundComponent";
import SignUpInputs from "./components/SignUpInputs";
const SignUp = () => {


  return (
    <div className = 'signup__page'>
        <SignUpInputs/>
        <div className = 'signup__page__dots-vertical-background'>
            <VerticalDotBackGround/>
        </div>

        <div className = 'signup__page__dots-vertical-background2'>
            <VerticalDotBackGround/>
        </div>

        <div className = 'signup__page__zig-zag-background'>
            <ZigZagBackgroundComponent/>
        </div>

        <div className = 'signup__page__spiral-background'>
            <SpiralBackground/>
        </div>

        <div className = 'signup__page__blue-spiral-background'>
            <BlueSpiralBackground/>
        </div>
    </div>
  );
};

export default SignUp;
