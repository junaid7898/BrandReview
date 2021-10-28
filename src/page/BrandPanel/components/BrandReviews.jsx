import React, { useState, useEffect } from "react";
import { axios } from "../../../axios/axiosInstance";
import FilterComponent from "../../../components/filter_component/FilterComponent";
import MultiDatePicker from "../../../components/multi_date_picker/MultiDatePicker";
import Star from "../../../assests/Star";
import ImageThumbnail from "../../../components/image_thumbnail/ImageThumbnail";
import Pagination from "../../../components/Pagination/Pagination";
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageViewer from "../../../components/image_viewer/ImageViewer";

const BrandReviews = ({ brandId }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviewData, setReviewData] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortOptions, setSortOptions] = useState();
  const [date, setDate] = useState(null);
  const [isBlackListing, setIsBlacklisting] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {client} = useSelector(state => state.client) 
  const [previewImage, setPreviewImage] = useState(null)

  const handlePageination = (index) => {
    setPage(index);
  };

  useEffect(() => {
    setReviewData(null);
    setCurrentPage(0);
    const options = {
      page,
      limit: 10,
      sortBy: sortOptions,
      populate: "user.User",
    };
    let newFilter = filters;

    if (date) {
      newFilter = {
        ...newFilter,
        createdOn: JSON.stringify({
          $gt: new Date(date[0]),
          $lt: new Date(date[1]),
        }),
      };
    }
    newFilter = {
      ...newFilter,
      brand: brandId,
    };
    console.log(newFilter);
    console.log(options);
    axios
      .post(`/review/query/`, { filters: newFilter, options })
      .then(({ data }) => {
        console.log("review brand data: ====> ", data);
        setReviewData(data.results);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page);
      });
  }, [page, filters, sortOptions, date]);

  //FIXME for admin blacklist user
  const handleBlacklist = (id) => {
    setIsBlacklisting([...isBlackListing, id]);
  };

  const handleRemoveBlacklist = (id) => {
    setIsBlacklisting([...isBlackListing, id]);
  };

  return (
    <div className="dashboard__review__component">
      <div className="dashboard__review__component__container">
        <div className="dashboard__review__component__item">
          <FilterComponent
            tab="review"
            setFilters={setFilters}
            setSortOptions={setSortOptions}
          />
        </div>
        <div className="dashboard__review__component__item">
          <MultiDatePicker date={date} setDate={setDate} />
        </div>
      </div>

      <div className="dashboard__panel__reports">
        <table className="dashboard__panel__reports__table">
          <tr>
            <th>User Name</th>
            <th>Ratings</th>
            <th>Review</th>
            <th>Date</th>
          </tr>
          {reviewData &&
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
                        <h4>{item.ratingCount}</h4>
                        <span className="dashboard__panel__reports__table__data-rows__ratings__stars">
                          {Array(
                            Math.round(
                              item.ratingCount < 1 ? 1 : item.ratingCount
                            )
                          )
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
                    <td>{new Date(item.createdOn).toDateString()}</td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        handlePageination={handlePageination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default BrandReviews;