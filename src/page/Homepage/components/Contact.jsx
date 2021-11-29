import {axios} from '../../../axios/axiosInstance'
import React, { useEffect, useRef, useState } from 'react'

import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
import {IoLocation} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import {statusAction} from "../../../Redux/statusSlice"
function Contact() {
    const dispatch = useDispatch()
    const { client } = useSelector(state => state.client)
    const [isSending, setIsSending] = useState(false)
    const nameRef = useRef("")
    const emailRef = useRef("")
    const messageRef = useRef("")
    const handleSend = () =>{
        setIsSending(true)
        axios.post('/contact',{
            name: nameRef.current,
            email: emailRef.current,
            message: messageRef.current
        })
        .then((_) =>{
            dispatch(statusAction.setNotification({
                message:"Email Sent",
                type: "success"
            }))
            setIsSending(false)
        })
        .catch(err =>{
            dispatch(statusAction.setNotification({
                message:"Email not Sent",
                type: "error"
            }))
            console.log(err)
            document.getElementById("contact_messageInput").value=""
            setIsSending(false)
        })
    }

    useEffect(() => {
        if(client){
            if(client.type.includes("user")){
                nameRef.current = client.user.name
                emailRef.current = client.user.email
            }
            else if(client.type.includes("brand")){
                nameRef.current = client.brand.name
                emailRef.current = client.brand.email
            }
        }
        else{
            nameRef.current = ""
            emailRef.current = ""
            document.getElementById("contact_nameInput").value=""
            document.getElementById("contact_emailInput").value=""
        }
    }, [client])

    return (
        <div className="contact">
            <div className="contact__form">
                <div className="contact__form__header">
                    <p>Do you have any Questions</p>
                </div>
                <div className="contact__form__fields">
                    <div className="contact__form__upper">
                        <input id= "contact_nameInput" onChange={(e) => nameRef.current = e.target.value} defaultValue={nameRef.current} type="text" className="contact__form__input" placeholder="Name" />
                        <input id = "contact_emailInput" onChange={(e) => emailRef.current = e.target.value} defaultValue={emailRef.current} type="text" className="contact__form__input"  placeholder="Email"/>
                    </div>
                    <input id = "contact_messageInput" onChange={(e) => messageRef.current = e.target.value} type="text" className="contact__form__input contact__form__input-message" placeholder="Message" />
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
                    <a href = 'mailto:info@sikayetbox.com' className="contact__info__item__text">info@sikayetbox.com</a>
                </div>
            </div>
        </div>
    )
}

export default Contact
