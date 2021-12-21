import React, { useState, useEffect } from "react";
import { axios } from "../../../axios/axiosInstance";
import Star from "../../../assests/Star";
import ImageThumbnail from "../../../components/image_thumbnail/ImageThumbnail";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import ImageViewer from "../../../components/image_viewer/ImageViewer";
import EmptyData from "../../../components/EmptyDataComponent/EmptyData";
const BrandReviews = ({ brandId, date, filters, sortOptions }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviewData, setReviewData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImage, setPreviewImage] = useState(null)

  const handlePageination = (index) => {
    setPage(index);
  };

  useEffect(() => {
    if(filters && sortOptions){
      setReviewData(null);
    setCurrentPage(0);
    const options = {
      page,
      limit: 10,
      sortBy: sortOptions,
      populate:"user.User"
    };
    let newFilter = {...filters};

    if (date) {
      newFilter = {
        ...newFilter,
        createdAt: JSON.stringify({
          $gt: new Date(date[0]),
          $lt: new Date(date[1]),
        }),
      };
      console.log(date);
    }
    newFilter = {
      ...newFilter,
      "brand": brandId,
      "isVerified": true
    };
    axios
      .post(`/review/query/`, { filters: newFilter, options })
      .then(({ data }) => {
        setReviewData(data.results);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page);
        console.log('reviewksddddddddddd:', data.results);
        console.log('filters', newFilter);
      });
    }
  }, [page, filters, sortOptions, date]);

  return (
    <div className="dashboard__review__component">
    {
      reviewData && reviewData.length > 0 ? 

      <div className="dashboard__panel__reports">
        <table className="dashboard__panel__reports__table">
          <tr>
            <th>User Name</th>
            <th>Ratings</th>
            <th>Review</th>
            <th>Date</th>
          </tr>
          {reviewData ?
            reviewData.map((item) => {
              return (
                <>
                  <tr
                    className="dashboard__panel__reports__table__data-rows"
                    id={item.id}
                  >
                    <td className="dashboard__panel__reports__table__data-rows__name">
                      <Link to = {`/user/${item.user.id}`}>{item.user.name}</Link>
                    </td>
                    <td>
                      <div className="dashboard__panel__reports__table__data-rows__ratings">
                        <h4>{item.rating}</h4>
                        <span className="dashboard__panel__reports__table__data-rows__ratings__stars">
                          {Array(Math.round(item.rating < 1 ? 1 : item.rating))
                            .fill()
                            .map((_) => (
                              <Star
                                starGradient1="#FFDC64"
                                starGradient2="#FFC850"
                                starLines="#FFF082"
                              />
                            ))}
                        </span>
                      </div>
                    </td>

                    <td className="dashboard__panel__reports__table__comment">
                      {item.message}
                      <div className="dashboard__panel__reports__images">
                        {item.images.map((img) => {
                          return (
                            <div onClick = {() => setPreviewImage(img)}>
                              <ImageThumbnail image={img} />
                            </div>
                          );
                        })}
                        <>
                          {
                            previewImage ?
                              <ImageViewer image = {previewImage} setImage = {setPreviewImage}/>
                              :
                              null
                          }
                        </>
                      </div>
                    </td>
                    <td>{new Date(item.createdAt).toDateString()}</td>
                  </tr>
                </>
              );
            })
            :
            <EmptyData value = 'no review yet....come back again to see the update'/>
          }
        </table>
      </div>
      :
      <div className = 'empty__data__container'>
        <EmptyData value = {`hiç yorum`}/>
      </div>
    }

      <Pagination
        totalPages={totalPages}
        handlePageination={handlePageination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default BrandReviews;
