import React, { useRef, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import {ImCross} from 'react-icons/im';

const UpdateBrandProfile = ({phone, setPhone, about, setAbout, handleUpdate, setUpdateProfile}) => {
    const aboutLength = useRef(about.length)
    return (
        <div>
            <div className="update__brand__profile" style = {{position: 'relative'}}>
                    <div className="update__brand__profile__inputs">

                        <div className="update__brand__profile__inputs__phone">
                            <label htmlFor="phoneNumber">Phone Number </label>
                                <PhoneInput
                                    id = 'phoneNumber'
                                    placeholder="Enter phone number"
                                    value={phone}
                                    className = 'update__brand__profile__inputs__phone-input'
                                    name = 'phone number'
                                    onChange={setPhone}
                                />   
                        </div>

                        <div className="update__brand__profile__inputs__about">
                            <label htmlFor="aboutBrand">About {`[${aboutLength.current}/200]`}</label>
                                <textarea
                                    type = 'text'
                                    maxLength = {200}
                                    id = 'aboutBrand'
                                    placeholder="About Your brand[max of 200 chars]"
                                    value={about}
                                    className = 'update__brand__profile__inputs__about__input'
                                    name = 'about'
                                    onChange={(e) => {
                                        setAbout(e.target.value)
                                        aboutLength.current = e.target.value.length
                                    }}/>   
                        </div>




                        <div
                        className="update__brand__profile__inputs__submit-button"
                        onClick={() => {
                            handleUpdate()
                        }}
                        >
                            <h1>Ok</h1>
                        </div>
                        <div className="update__brand__profile__inputs__cancel-button" onClick = {() => setUpdateProfile(false)}>
                            <ImCross className = 'update__brand__profile__inputs__cancel-button-icon'/>
                        </div>
                    </div>


                    </div>
        </div>
    )
}

export default UpdateBrandProfile
