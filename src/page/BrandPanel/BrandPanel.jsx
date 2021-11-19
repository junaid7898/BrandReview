import React, {useState, useEffect} from 'react'
import BrandContent from './components/BrandContent'
import BrandDetail from './components/BrandDetail'
import { useLocation, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import {axios} from '../../axios/axiosInstance'
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
import BlueSpiralBackground from '../login/components/BlueSpiralBackground'
import SpiralBackground from '../login/components/SpiralBackground'
import HorizantalDotBackGround from '../login/components/HorizantalDotBackground'
import VerticalDotBackGround from '../login/components/VerticalDotBackGround'
import BlueZigZagComponent from '../login/components/BlueZigZagComponent'
import ZigZagBackgroundComponent from '../login/components/ZigZagBackgroundComponent'

const BrandPanel = () => {
    useEffect(() => {
        window.scrollTo(0,0)
  }, [useLocation().pathname])
    const {client} = useSelector(state => state.client)

    const [brandDetails, setBrandDetails] = useState(null)
    const { brandId } = useParams()

    const [visitorIsBrand, setVisitorIsBrand] = useState(false)

    useEffect(() => {

        if(client){
            if(client.type.includes("brand")){
                if(client.brand.id === brandId){
                    setVisitorIsBrand(true)
                }
            }
        }
        else{
            setVisitorIsBrand(false)
        }
    }, [client, brandId])


    useEffect(() => {
        if(brandId && client){
            axios.get(`/brand/${brandId}`, {   
                headers:{
                    "role" : "brand",
                    "Authorization" : `bearer ${client.tokens.access.token}`
                }
            })   
            .then( res =>{
                setBrandDetails(res.data)
            })
            .catch( err => {
                alert(err)
            })
        }
    }, [client, brandId])

    
    return (
        <div style = {{position: 'relative'}}>
        {
            brandDetails ? 
            (
                <div className = 'brand__main'>
                
                    <div className="brand__main__brand-content">
                        <BrandContent setItem = {setBrandDetails} item = {brandDetails}/>
                    </div>

                    <div className="brand__main__brand-details">
                        <BrandDetail item = {brandDetails}  brandId = {brandId} visitorIsBrand = {visitorIsBrand}/>
                    </div>
                </div>   
            )
            :
            (
                <LoadingIndicator/>
            )
        }
            <div className = 'brand__background__blue-spiral'>
                <BlueSpiralBackground/>
            </div> 
            <div className = 'brand__background__yellow-spiral'>
                <SpiralBackground/>
            </div> 
            <div className = 'brand__background__horizantal-dot'>
                <HorizantalDotBackGround/>
            </div>   
            {/* <div className = 'brand__background__vertical-dot2'>
                <VerticalDotBackGround/>
            </div>  */}
            <div className = 'brand__background__vertical-dot'>
                <VerticalDotBackGround/>
            </div>  
            <div className = 'brand__background__yellow-zigzag'>
                <ZigZagBackgroundComponent/>
            </div>  
            <div className = 'brand__background__blue-zigzag'>
                <BlueZigZagComponent/>
            </div>  
        </div>
    )
}

export default BrandPanel
