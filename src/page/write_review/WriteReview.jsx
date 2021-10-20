import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ImagePreview from "../../components/image_preview/ImagePreview"
import { uploadMultiPhotos } from "../../helpers/uploadMultiplePhotos";
import {getImageDetails} from "../../helpers/getImageDetails";
import { useHistory } from "react-router";
const WriteReview = () => {
  const history = useHistory()
  let title = ''
  let message = ''
  const ref = useRef()
  const [uploadImage, setUploadImage] = useState([]);
  const [imageDetails, setImageDetails] = useState([])
  const [rawImages, setRawImages] = useState([])
  const {client} = useSelector(state => state.client)


  const fileSelectHandler = async(e) => {
    const images = e.target.files
    if((images.length + uploadImage.length) > 5){
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
    setUploadImage([...uploadImage, ...loadedImages])
  };
  
  const removeImage = (i) => {

    setUploadImage( uploadImage.filter((img, index) => index !== i) )

  }




  const onPublish = async(e) => {
    e.preventDefault()

    
    const review = {
      brand: '6155976cbfb62b39dc24e876',
      user: client.user.id,
      title: "This is a test review",
      message: "This is a test Message",
    }
    const {data: imageArray} = await axios.post('http://localhost:4000/v1/review/', {review, imageDetails},{
      headers:{
        "authorization" : `bearer ${client.tokens.access.token}`,
        "role" : Object.keys(client)[0]
      }
    })
    axios.all(imageArray.map( (_, index) => {
      console.log(imageArray[index], "\n", rawImages[0][index], "\n", imageDetails[index].fileType, "\n")
      axios.put(imageArray[index], rawImages[0][index],{
        headers:{
          "Content-Type": imageDetails[index].fileType
        }
      })
      .then( (_) => {
        history.push("/")
      })
      .catch(err => {
        console.log(err)
      })
    }))
  }

  return (
    <div className="review-container">
      <section className="review">
        <img className="review__img" src="/assets/review_img.png" alt = 'user' />
        <form ref = {ref} className="review__content" onSubmit = {(e) => {
          onPublish(e)
        }} >
          <div className="review__content__tboxes">
            <input
              type="text"
              placeholder="Select the Brand"
              className="review__content__textbox"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="review__content__textbox"
              onChange = {(e) => {title = e.target.value}}
              required
            />
            {/* <select className = 'review__content__dropdown' onChange = {(e) => {reviewType = e.target.value}} required>
              <option value = {null} disabled selected = 'selected'>select review type</option>
              <option value = 'complaint'>Complaint</option>
              <option value = 'review'>Review</option>
              <option value = 'thanked'>Thanked</option>
            </select> */}
            <textarea
              placeholder="Write Your Review"
              className="review__content__textarea"
              rows={10}
              onChange = {e => {message = e.target.value}}
              required
            />
          </div>
          <div className="review__content__upload">
          {
              uploadImage.length > 0 ? 
            (
              uploadImage.map( (img, index) => 
                <div key={index} className="review__content__previewImg">
                  <ImagePreview image={img} index={index} removeImage = {removeImage} />
                </div>
              )
            )
            :
            (
              null
            )
          }
          </div>
          

          <div className="review__content__buttons">
            <div className="review__content__uploadButton">
              <label htmlFor="uploadMedia">Upload Media</label>
              <input
                type="file"
                name="file"
                multiple = {true}
                accept="image/*"
                id="uploadMedia"
                onChange={fileSelectHandler}
                onClick = { (e) => {e.target.value = null}}
              />
            </div>
            <button type = 'submit' className="review__content__publishButton" >Publish</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WriteReview;
