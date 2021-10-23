import React, { useState } from 'react'

import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
import {IoLocation} from 'react-icons/io5'
import { useSelector } from 'react-redux'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'

function Contact() {
    const { client } = useSelector(state => state.client)
    const [isSending, setIsSending] = useState(false)

    const handleSend = () =>{
        setIsSending(true)
    }

    return (
        <div className="contact">
            <div className="contact__form">
                <div className="contact__form__header">
                    <p>Do you have any Questions</p>
                </div>
                <div className="contact__form__fields">
                    <div className="contact__form__upper">
                        <input value={
                            client 
                            ? 
                                client.type.includes("user") 
                                ?
                                    client.user.name
                                : 
                                    client.type.includes("brand") 
                                    ?
                                        client.brand.name
                                    :
                                        null
                            :
                                null
                            } type="text" className="contact__form__input" placeholder="Name" />
                        <input value={
                            client 
                            ? 
                                client.type.includes("user") 
                                ?
                                    client.user.email
                                : 
                                    client.type.includes("brand") 
                                    ?
                                        client.brand.email
                                    :
                                        null
                            :
                                null
                            } type="text" className="contact__form__input"  placeholder="Email"/>
                    </div>
                    <input type="text" className="contact__form__input contact__form__input-message" placeholder="Message" />
                </div>
                <button disabled={isSending} onClick={handleSend} className="contact__form__button">
                    Send
                    {
                        isSending &&
                        <LoadingIndicator />
                    }
                </button>
            </div>
            <div className="contact__info">
                <div className="contact__info__item">
                    <AiOutlineMail className="contact__info__item__icon"/>
                    <p className="contact__info__item__text">mfahad018@gmailc,om</p>
                </div>
                <div className="contact__info__item">
                    <IoLocation className="contact__info__item__icon"/>
                    <p className="contact__info__item__text">mfahad018@gmailc,om</p>
                </div>
                <div className="contact__info__item">
                    <AiOutlinePhone className="contact__info__item__icon"/>
                    <p className="contact__info__item__text">mfahad018@gmailc,om</p>
                </div>
            </div>
        </div>
    )
}

export default Contact
