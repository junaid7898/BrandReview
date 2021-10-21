import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import BeatsLogo from '../../../assests/images/beats_logo.png'
import FirstPosition from '../../../assests/images/1st.png'
import SecontPosition from '../../../assests/images/2nd.png'
import ThirdPosition from '../../../assests/images/3rd.png'
import { useSelector } from 'react-redux'

function TopTenBrands() {

    const {brands: topBrands} = useSelector(state => state.brands)
    return (
        <div className="topbrands">
            {
                topBrands.map((item, index) => {
                    return(
                             <Link to={`/brand/${item.id}`} className="topbrands__list">
                                {index === 0 || index === 1 || index === 2 ? 
                                    (
                                    <img alt="brand ranking" src = {index === 0 ? FirstPosition : index === 1 ? SecontPosition : ThirdPosition } className = 'topbrands__list__position'/>)
                                    :
                                    (null)
                                }
                                <img alt={`brand ${item.name} logo`} className="topbrands__list__img" src = {item.logo}/>
                                <h1 className="topbrands__list__name">{item.name}</h1>
                                <h3 className="topbrands__list__category">{item.category}</h3>
                                <h3 className="topbrands__list__ratings">
                                
                                <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.526 8.6112L18.6896 7.8844L15.5768 0.65609C15.3588 0.149956 14.6412 0.149956 14.4233 0.65609L11.3104 7.88435L3.47403 8.6112C2.9253 8.66206 2.70358 9.34456 3.11755 9.70825L9.03014 14.9024L7.2998 22.5799C7.17863 23.1175 7.75924 23.5392 8.23303 23.2579L15 19.2398L21.767 23.2579C22.2409 23.5393 22.8214 23.1175 22.7003 22.5799L20.9699 14.9024L26.8825 9.70825C27.2965 9.34456 27.0747 8.66206 26.526 8.6112Z" fill="#FFDC64"/>
                                    <path d="M6.98892 0.407324C7.38841 0.962207 8.51599 3.34522 9.16064 4.73401C9.26201 4.95233 8.98808 5.14956 8.81318 4.98415C7.70066 3.93227 5.79841 2.10696 5.39892 1.55201C5.0828 1.11297 5.18247 0.500781 5.62157 0.184667C6.06062 -0.131447 6.67281 -0.0317202 6.98892 0.407324Z" fill="#FFF082"/>
                                    <path d="M23.0111 0.407324C22.6116 0.962207 21.484 3.34522 20.8393 4.73401C20.738 4.95233 21.0119 5.14956 21.1868 4.98415C22.2993 3.93227 24.2015 2.1069 24.6011 1.55201C24.9172 1.11297 24.8175 0.500781 24.3784 0.184667C23.9394 -0.131447 23.3272 -0.0317202 23.0111 0.407324Z" fill="#FFF082"/>
                                    <path d="M29.3239 16.6792C28.6739 16.4673 26.0609 16.117 24.5419 15.9249C24.3032 15.8946 24.1985 16.2155 24.4092 16.3319C25.7494 17.0722 28.0664 18.3299 28.7164 18.5419C29.2307 18.7096 29.7837 18.4287 29.9514 17.9143C30.1192 17.3999 29.8382 16.847 29.3239 16.6792Z" fill="#FFF082"/>
                                    <path d="M0.676088 16.6792C1.32613 16.4673 3.93912 16.117 5.45805 15.9249C5.69682 15.8946 5.80147 16.2155 5.59082 16.3319C4.25061 17.0722 1.93363 18.3299 1.28359 18.5419C0.769252 18.7096 0.216302 18.4287 0.0485477 17.9143C-0.119206 17.3999 0.161751 16.847 0.676088 16.6792Z" fill="#FFF082"/>
                                    <path d="M14.0504 27.7347C14.0504 27.051 14.5277 24.4582 14.8159 22.9545C14.8612 22.7181 15.1988 22.7181 15.2441 22.9545C15.5324 24.4582 16.0096 27.051 16.0096 27.7347C16.0096 28.2757 15.571 28.7143 15.03 28.7143C14.489 28.7143 14.0504 28.2757 14.0504 27.7347Z" fill="#FFF082"/>
                                    <path d="M16.7087 3.28461L15.5767 0.65609C15.3587 0.149956 14.6411 0.149956 14.4232 0.65609L11.3104 7.88435L3.47403 8.6112C2.9253 8.66206 2.70358 9.34456 3.11755 9.70825L9.03014 14.9024L7.2998 22.5799C7.17863 23.1175 7.75924 23.5392 8.23303 23.2579L9.13367 22.7231C10.6102 13.1653 14.7611 6.14915 16.7087 3.28461Z" fill="#FFC850"/>
                                </svg>

                                    <p>{item.ratingCount}</p>
                                </h3>
                            </Link> 
                        
                        
                    )
                })
            }
        </div>
    )
}

export default TopTenBrands
