import React, { useState } from 'react'
import { IoMdAttach } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';
import ImagePreview from '../image_preview/ImagePreview';
import { getImageDetails } from '../../helpers/getImageDetails';
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from 'axios';
const WriteYourReviewComponent = ({setPage, brandId}) => {
    const [showSubmitIcon, setShowSubmitIcon] = useState(false)

    const history = useHistory()

    const [imgArray, setImgArray] = useState([])
    const [imageDetails, setImageDetails] = useState([])
    const [rawImages, setRawImages] = useState([])

    const [message, setMessage] = useState("")
    const [isPublishing, setIsPublishing] = useState(false)

    const {client} = useSelector(state => state.client)

    const fileSelectHandler = async(e) => {
        const images = e.target.files
        if((images.length + imgArray.length) > 5){
          alert("Only 5 Images Allowed")
          return 0
        }

        let loadedImages = [];
        let imageInfo = [];
        let saveImages = [];
        for(let index = 0; index < images.length ; index++){
          const g = getImageDetails(images[index])
          if( !g ){
            continue
          }
          else{
            imageInfo = [...imageInfo,getImageDetails(images[index])]
            loadedImages = [...loadedImages, URL.createObjectURL(images[index])]
            saveImages = [...saveImages, images[index]]
          }
        }
        setRawImages([...rawImages, saveImages ])
        setImageDetails([...imageDetails, ...imageInfo])
        setImgArray([...imgArray, ...loadedImages])
    }

    const handlePublish = async () =>{
      setIsPublishing(true)
      // setImgArray([])
      // setMessage("")
      // setPage(1)
    const review = {
      brand: brandId,
      user: client.user.id,
      message: message,
    }
    const {data: imageArray} = await axios.post('http://localhost:4000/v1/review/', {review, imageDetails},{
      headers:{
        "authorization" : `bearer ${client.tokens.access.token}`,
        "role" : Object.keys(client)[0]
      }
    })
    axios.all(imageArray.map( (_, index) => {
      // console.log(imageArray[index], "\n", rawImages[0][index], "\n", imageDetails[index].fileType, "\n")
      axios.put(imageArray[index], rawImages[0][index],{
        headers:{
          "Content-Type": imageDetails[index].fileType
        }
      })
      .then( (_) => {
        setIsPublishing(false)
        history.push("/")  
      })
      .catch(err => {
        setIsPublishing(false)
        alert(JSON.stringify(err))
      })
    }))
    }

    const removeImage = (i) => {
      setImgArray( imgArray.filter((img , index) => index !== i) )
    }

    return (
        <div className = 'review1'>
        <div className="review1__img-thumb">
        {
          imgArray.length > 0 ? 
            (
              <div className="review1__img-thumb__array">
              {
                imgArray.map(
                  (item, index) => 
                  {
                      return(
                          <div className="review1__img-thumb__div" id = {item.id}>
                              <ImagePreview image = {item} index = {index} removeImage = {removeImage}/>
                          </div>
                      )
                  }
                )
              }
              </div>
            )
            :
            (
                null
            )
        }
        </div>
        <div className="review1__your-review">   
          <textarea value={message} onChange={(e) => {
            setMessage(e.target.value)
            if(e.target.value.length > 0){
              setShowSubmitIcon(true)
            }
            else{
              setShowSubmitIcon(false)
            }
          }} type="text" placeholder="Write Your Review" name="review" />
          <div className="review1__your-review__icons">
            <label htmlFor="picUpload">
              <IoMdAttach
                size={24}
                className="review1__your-review__icons__upload-icon"
              />
            </label>
            <input
              id="picUpload"
              type="file"
              name="picUpload"
              accept="image/*"
              multiple
              onChange = {fileSelectHandler}
            />

              <FaTelegramPlane  onClick={handlePublish} className={showSubmitIcon ? 'review1__your-review__icons__show-send' : 'review1__your-review__icons__send-icon'} size={24} color = 'rgba(0, 0, 0, 0.5)' />
            
          </div>
          {
            isPublishing &&
            <LoadingIndicator />
          }
        </div> 
      </div>
    )
}

export default WriteYourReviewComponent
