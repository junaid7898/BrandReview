import React, { useState } from "react";
import ReviewImg from "../../assests/images/review_img.png";
import { GrClose } from "react-icons/gr";
import ImageViewer from "../../components/image_viewer/ImageViewer";
const WriteReview = () => {
  const [uploadImage, setUploadImage] = useState([]);
  const [onClickImage, setOnClickImage] = useState(false);

  const fileSelectHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage([...uploadImage, reader.result ]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="review-container">
      <section className="review">
        <img className="review__img" src={ReviewImg} alt = 'user' />
        <div className="review__content">
          <div className="review__content__tboxes">
            <input
              type="text"
              placeholder="Select the Brand"
              className="review__content__textbox"
            />
            <input
              type="text"
              placeholder="Subject"
              className="review__content__textbox"
            />
            <textarea
              placeholder="Write Your Review"
              className="review__content__textarea"
              rows={10}
            />
          </div>
          <div className="review__content__upload">
          {
              uploadImage.length > 0 ? 
            (
              uploadImage.map( img => 
                <div className="review__content__previewImg">
                  <img
                    src={img}
                    onClick={() => setOnClickImage(img)}
                    className="review__content__previewImg__img"
                    alt = 'user'
                  />
                  {
                    onClickImage ?
                      <ImageViewer image={onClickImage} setImage={setOnClickImage} />
                    :
                      null
                  }
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
                accept="images/*"
                id="uploadMedia"
                onChange={fileSelectHandler}
              />
            </div>
            <h3 className="review__content__publishButton">Publish</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriteReview;
