import React from "react";
import "./profilecontent.css";
import ProfileImg from "../../assests/images/Profile Image.png";

const ProfileContent = () => {
  return (
      <section >
        <div className="profile__intro">
          <img src={ProfileImg} />

          <div className="profile__intro__nameAndAddress">
            <h1>Eddie Feest</h1>
            <h3>1499 Traders Alley</h3>
            <h3>Kansas City, MO6549</h3>
          </div>

          <p className="profile__intro__detail">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries,
            </p>
          </div>
      </section>
  );
};

export default ProfileContent;
