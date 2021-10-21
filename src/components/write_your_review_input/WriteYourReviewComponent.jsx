import React, { useState } from 'react'
import { IoMdAttach } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { computeHeadingLevel } from '@testing-library/react';
import ImageThumbnail from '../image_thumbnail/ImageThumbnail';
import ImageViewer from '../image_viewer/ImageViewer';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';

const WriteYourReviewComponent = ({setPage}) => {
    const [imgObj, setImgObj] = useState([])
    const [imgArray, setImgArray] = useState([])
    const [clicked, setClicked] = useState(null)
    const [message, setMessage] = useState("")
    const [isPublishing, setIsPublishing] = useState(false)
    const addImage = (e) => {
        console.log('here 1111111');
        let imgObj1 = [e.target.files]
        for(let i = 0; i < imgObj1[0].length; i++){
            setImgArray((state) => [...state,URL.createObjectURL(imgObj1[0][i]) ])
        }
    }

    const handlePublish = () =>{
      setIsPublishing(true)
      // setImgArray([])
      // setMessage("")
      // setPage(1)
    }
    return (
        <div className = 'review1'>
        <div className="review1__img-thumb">
        {
          imgArray.length > 0 ? 
            (
              imgArray.map(
                  (item, index) => {
                      return(
                          <div className="review1__img-thumb__div" id = {index} onClick = {() => {
                              setClicked(item)
                          }}>
                              <ImageThumbnail image = {item}/>
                          </div>
                      )
              })
            )
            :
            (
                null
            )
        }
        {
        clicked !== null ?  
          <ImageViewer image={clicked} setImage={setClicked} />
        :
          null
        }
        </div>
        <div className="review1__your-review">   
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Write Your Review" name="review" />
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
              onChange = {(e) => {
                  addImage(e)
              }}
            />
            <FaTelegramPlane onClick={handlePublish} className="review1__your-review__icons__send-icon" size={24} color = 'rgba(0, 0, 0, 0.5)' />
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
