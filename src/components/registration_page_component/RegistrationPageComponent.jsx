import React from "react";
import MainIcon from "../../assests/icons/mainIcon.png";
import TopLeft from "../../assests/icons/top1.png";
import TopRight from "../../assests/icons/top2.png";
import BottomLeft from "../../assests/icons/bottom1.png";
import BottomRight from "../../assests/icons/bottom2.png";
import { Link } from "react-router-dom";

const RegistrationPageComponent = () => {
  return (
      <div className="registration__form__icons">
        <img src={MainIcon} className="registration__form__icons__main" />
        <img src={TopLeft} className="registration__form__icons__topleft" />
        <img src={TopRight} className="registration__form__icons__topright" />
        <img
          src={BottomLeft}
          className="registration__form__icons__bottomleft"
        />
        <img
          src={BottomRight}
          className="registration__form__icons__bottomright"
        />
      </div>
  );
};

export default RegistrationPageComponent;
