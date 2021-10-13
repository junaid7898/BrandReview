import React, { useEffect, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import ImageViewer from "../../../components/image_viewer/ImageViewer";


const BrandReviews = ({ comments }) => {
  const [uploadImage, setUploadImage] = useState([]);
  const [onClickImage, setOnClickImage] = useState(false);

  const addImage = (image) => {
    if(uploadImage.length > 5){
      alert("max 5 images")
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage([...uploadImage, reader.result ]);
      }
    };

    reader.readAsDataURL(image);


  };

  useEffect(() => {
    console.log(uploadImage)
  }, [uploadImage])

  return (
    <div className="brand__review">
      <div className="brand__review__uploadContainer">
        {
          uploadImage.length > 0 ? (
            uploadImage.map(img => 
              <div className="brand__review__image">
              <img
                src={img}
                className="brand__review__image__uploaded"
                onClick={() => {
                  setOnClickImage(img);
                }}
                alt = 'brand'
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
          null
        }
      </div>

      <div className="brand__review__your-review">
        <input type="text" placeholder="Write Your Review" name="review" />
        <div className="brand__review__your-review__icons">
          <label htmlFor="picUpload">
            <IoMdAttach
              size={24}
              className="brand__review__your-review__icons__upload-icon"
            />
          </label>
          <input
            id="picUpload"
            type="file"
            name="picUpload"
            accept="images/*"
            onChange={(e) => {
              addImage(e.target.files[0]);
            }}
          />
          <FaTelegramPlane size={24} />
        </div>
      </div>
      {comments.map((item) => {
        return (
          <div className="brand__review__comments">
            <div className="brand__review__comments__intro">
              <div className="brand__review__comments__intro__profile">
                <img
                  src={item.userImg}
                  className="brand__review__comments__intro__profile__img"
                  alt = 'brand'
                />
                <div className="brand__review__comments__intro__profile__name-rating">
                  <h2>{item.userName}</h2>
                  <h3>{item.userRatings}</h3>
                  <div className="brand__review__comments__intro__profile__name-rating__comment">
                    <p>{item.comment}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="brand__review__replies">
              {item.commentReplies.map((item) => {
                return (
                  <div className="brand__review__replies__reply">
                    <img src={item.userImg} alt = 'brand'/>
                    <div className="brand__review__replies__reply__comment">
                      <p>{item.reply}</p>
                      <div className="brand__review__replies__reply__comment__like">
                        <h4>Like</h4>
                        <h4>reply</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="brand__review__replies__my-comment">
              <img src={item.userImg} alt = 'brand' />
              <input
                type="text"
                placeholder="write your comment"
                name="comment"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrandReviews;
