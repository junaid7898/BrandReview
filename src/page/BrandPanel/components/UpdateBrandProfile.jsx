import React, { useRef } from 'react'
import {ImCross} from 'react-icons/im';
import Select from "react-select";
import SelectCategory from '../../../components/select_category/SelectCategory'
const UpdateBrandProfile = ({ about,email, setEmail, name, setName, category, setCategory,options, setAbout, handleUpdate, setUpdateProfile}) => {
    const aboutLength = useRef(about.length)
    return (
        <div>
            <div className="update__brand__profile" style = {{position: 'relative'}}>
                    <div className="update__brand__profile__inputs">
                        <div className = 'update__brand__profile__email'>
                            <label htmlFor = 'brandEmail'>Email Adresi</label>
                            <input
                                id = 'brandEmail'
                                name = 'brand email'
                                value = {email}
                                type = 'email'
                                onChange = {e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className = 'update__brand__profile__email'>
                            <label htmlFor = 'brandName'>Marka İsmi</label>
                            <input
                                id = 'brandName'
                                name = 'brand name'
                                value = {name}
                                type = 'text'
                                onChange = {e => setName(e.target.value)}
                            />
                        </div>

                        <div className="update__brand__profile__category">
                            <label htmlFor="categoryBrand">Kategori</label>
                            <SelectCategory value = {category} setValue = {setCategory}/>
                        </div>

                        <div className="update__brand__profile__inputs__about">
                            <label htmlFor="aboutBrand">Marka Açıklaması {`[${aboutLength.current}/200]`}</label>
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
