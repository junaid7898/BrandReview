import React, { useState } from 'react'
import { IoMdAttach } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { computeHeadingLevel } from '@testing-library/react';
import ImageThumbnail from '../image_thumbnail/ImageThumbnail';
import ImageViewer from '../image_viewer/ImageViewer';

const WriteYourReviewComponent = () => {
    const [imgObj, setImgObj] = useState([])
    const [imgArray, setImgArray] = useState([])
    const [clicked, setClicked] = useState(null)
    const addImage = (e) => {
        console.log('here 1111111');
        let imgObj1 = [e.target.files]
        for(let i = 0; i < imgObj1[0].length; i++){
            setImgArray((state) => [...state,URL.createObjectURL(imgObj1[0][i]) ])
        }
    }
    return (
        <div className = 'review1'>
        <div className="review1__img-thumb">
            {imgArray.length > 0 ? 
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
        <input type="text" placeholder="Write Your Review" name="review" />
        <div className="review1__your-review__icons">
          <label htmlFor="picUpload">
            <IoMdAttach
              size={24}
              className="review1__your-review__icons__upload-icon"
              color = 'rgba(0, 0, 0, 0.5)'
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
          <FaTelegramPlane size={24} color = 'rgba(0, 0, 0, 0.5)' />
        </div>
      </div> 
      </div>
    )
}

export default WriteYourReviewComponent
