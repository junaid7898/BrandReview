import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ImagePreview from "../../components/image_preview/ImagePreview"
import { uploadMultiPhotos } from "../../helpers/uploadMultiplePhotos";
const WriteReview = () => {
  let title = ''
  let message = ''
  const ref = useRef()
  const [uploadImage, setUploadImage] = useState([]);


  const {client} = useSelector(state => state.client)


  const fileSelectHandler = async(e) => {

    console.log(e.target.value)

    const images = e.target.files
    if((images.length + uploadImage.length) > 5){
      alert("Only 5 Images Allowed")
      return 0
    }
    let loadedImages = [];

    const selectedImages = [];

    for(let index= 0; index < images.length ; index++){
      if(images[index].size > 2500000){
        continue
      }

      console.log(URL.createObjectURL(images[index]))
      loadedImages = [...loadedImages, URL.createObjectURL(images[index])]
    }



    setUploadImage([...uploadImage, ...loadedImages])
    
  };
  
  const removeImage = (i) => {

    setUploadImage( uploadImage.filter((img, index) => index !== i) )

  }




  const onPublish = async(e) => {
    e.preventDefault()

    
    const review = {
      brand: '614ecb6cad38bb28644f1a1e',
      user: client.user.id,
      title: "asdas",
      message: "Message",
    }

    axios.post('http://localhost:4000/v1/review/', {review, uploadImage})

    


    // const urls = await uploadMultiPhotos(review, user, uploadImage)
    // alert(JSON.stringify(review, null, 2))
    // ref.current.reset()
    // setUploadImage([])
    
    //NOTE Commented for testing purposes history.push('/')
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
