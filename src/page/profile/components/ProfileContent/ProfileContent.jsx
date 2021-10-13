import React, { useState, useRef } from "react";
import {HiCamera} from 'react-icons/hi'
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from '../../../../components/loadingIndicator/LoadingIndicator'
import { uploadPhoto } from "../../../../helpers/uploadPhoto";
import { userActions } from "../../../../Redux/user slice/userSlice";
const ProfileContent = ({user, setUser}) => {
  const [isImageUploading, setIsImageUploading] = useState(false)
  const {user:User} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const fileRef = useRef()
  const uploadphoto = async (e) => {
    try{
      setIsImageUploading(true)
      const { url: imageUrl } = await uploadPhoto(user,e.target.files[0], fileRef.current)
      console.log(imageUrl)
      setUser({
        ...user,
        profileImage: imageUrl
      })
      dispatch(userActions.setUser({
        tokens: {...User.tokens},
        user
      }))
      setIsImageUploading(false)
    }
    catch(err){
      setIsImageUploading(false)
      alert(err)
    }
  }
  
  return (
      user ?

      <section >
        <div className="profile__intro">
          <div className="profile__intro__infoSection">
            <div className="profile__intro__displayImage">
              <div className={`profile__intro__displayImage__content ${isImageUploading && `profile__intro__displayImage__content__uploading`}`}>
                <img src={user.profileImage} alt="profileasdasdsa" />
                <div className="profile__intro__displayImage__content__upload">
                  <HiCamera className="profile__intro__displayImage__content__upload__icon"/>
                  <p className="profile__intro__displayImage__content__upload__text">upload</p>
                  <input ref={fileRef} type="file" accept="image/*" className="profile__intro__displayImage__content__upload__file" onChange={uploadphoto} />
                </div>
              </div>
              {
                isImageUploading &&
                <div className="profile__intro__displayImage__loadingIndicator">
                  <LoadingIndicator />
                </div>
              }
            </div>

            <div className="profile__intro__nameAndAddress">
              <h1>{user.name}</h1>
              <h3>{user.email}</h3>
              <h3>{user.countryCode && user.phoneNumber ? user.countryCode+user.phoneNumber : null}</h3>
            </div>
          </div>

            <div className="profile__intro__aboutSection">
              <p className="profile__intro__detail">
                {user.about ? user.about : " - "}
              </p>
          </div>
        </div>
      </section>
      :
        null
  );
};

export default ProfileContent;
