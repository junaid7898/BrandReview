import React from "react";
import {HiCamera} from 'react-icons/hi'
const ProfileContent = ({user}) => {


  const uploadphoto = () =>{
    console.log("Upload")
  }

  return (
      user ?

      <section >
        <div className="profile__intro">
          <div className="profile__intro__displayImage">
            <img src={user.profileImage} alt = 'profile'/>
            <div className="profile__intro__displayImage__upload" onClick={uploadphoto}>
              <HiCamera className="profile__intro__displayImage__upload__icon"/>
              <p className="profile__intro__displayImage__upload__text">upload</p>
            </div>
          </div>

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
