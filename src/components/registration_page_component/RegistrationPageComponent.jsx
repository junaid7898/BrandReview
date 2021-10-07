import React from "react";
import MainIcon from "../../assests/icons/mainIcon.png";
import TopLeft from "../../assests/icons/top1.png";
import TopRight from "../../assests/icons/top2.png";
import BottomLeft from "../../assests/icons/bottom1.png";
import BottomRight from "../../assests/icons/bottom2.png";

const RegistrationPageComponent = () => {
  return (
      <div className="registration__form__icons">
        <img src={MainIcon} className="registration__form__icons__main" alt = "svg random"/>
        <img src={TopLeft} className="registration__form__icons__topleft" alt = "svg random"/>
        <img src={TopRight} className="registration__form__icons__topright" alt = "svg random"/>
        <img
          src={BottomLeft}
          className="registration__form__icons__bottomleft"
          alt = "svg random"
        />
        <img
          src={BottomRight}
          className="registration__form__icons__bottomright"
          alt = "svg random"
        />
      </div>
  );
};

export default RegistrationPageComponent;
