import React from "react";
import ProfileImg from "../../../../assests/images/Profile Image.png";

const ProfileContent = ({user}) => {
  return (
      user ?

      <section >
        <div className="profile__intro">
          <img src={user.profileImage} />

          <div className="profile__intro__nameAndAddress">
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <h3>{user.countryCode && user.phoneNumber ? user.countryCode+user.phoneNumber : null}</h3>
          </div>

          <p className="profile__intro__detail">
            {user.about ? user.about : " - "}
            </p>
          </div>
      </section>
      :
        null
  );
};

export default ProfileContent;
