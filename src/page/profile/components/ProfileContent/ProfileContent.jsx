import React, { useState, useRef, useEffect } from "react";
import {HiCamera} from 'react-icons/hi'
import { useSelector, useDispatch } from "react-redux";
import { axios } from "../../../../axios/axiosInstance";
import LoadingIndicator from '../../../../components/loadingIndicator/LoadingIndicator'
import { uploadPhoto } from "../../../../helpers/uploadPhoto";
import { clientActions } from "../../../../Redux/clientslice/clientSlice";
const ProfileContent = ({user, setClientDetails, visitorIsUser}) => {
  const [isImageUploading, setIsImageUploading] = useState(false)
  const {client:User} = useSelector(state => state.client)
  const dispatch = useDispatch()
  const fileRef = useRef()
  const uploadphoto = async (e) => {
    try{
      setIsImageUploading(true)
      const { url: imageUrl } = await uploadPhoto(user,e.target.files[0], fileRef.current)
      console.log(imageUrl)
      const newUser = {
        ...user,
        profileImage: imageUrl
      }
      dispatch(clientActions.setClient({
        ...User,
        user: newUser
      }))
      axios.patch(`user/${user.id}`,newUser,{
        headers:{
          "authorization" : `bearer ${User.tokens.access.token}`
        }
      })
      // setClientDetails(newUser)
      setClientDetails(newUser)
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
                {
                  isImageUploading ?
                    <LoadingIndicator/>
                    :
                    <div className="profile__intro__displayImage__content__img">
                      <img src={user.profileImage} alt="profileasdasdsa"  />
                    </div>
                }
                {
                  visitorIsUser ? 
                    <div className="profile__intro__displayImage__content__upload">
                      <HiCamera className="profile__intro__displayImage__content__upload__icon"/>
                      <p className="profile__intro__displayImage__content__upload__text">upload</p>
                      <input ref={fileRef} type="file" accept="image/*" className="profile__intro__displayImage__content__upload__file" onChange={uploadphoto} />
                    </div>
                    :
                    null  
                }

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
              <p>{user.email}</p>
              <p>{user.countryCode && user.phoneNumber ? user.countryCode+user.phoneNumber : null}</p>
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
