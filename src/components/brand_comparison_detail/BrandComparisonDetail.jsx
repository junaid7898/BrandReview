import React from "react";

const BrandComparisonDetail = (props) => {
    console.log('props===============',props)
  return (
    <div className="brand__comparison">
      <img
        src={props.brandDetails.logo}
        alt=""
        className="brand__comparison__logo"
      />
      <p className="brand__comparison__text">{props.brandDetails.name}</p>
      <div className="brand__comparison__review">
        <h3>Review Count</h3>
        <h4>{props.reviewCount}</h4>
      </div>
      <div className="brand__comparison__solved-count">
        <h3>Solved Count</h3>
        <h4
          className={`${
            props.isSolvedCountGreater
              ? "brand__comparison__solved-count__greater"
              : "brand__comparison__solved-count__smaller"
          }`}
        >
          {props.solvedCount}
        </h4>
      </div>

      <div className="brand__comparison__solved-count">
        <h3>Average Ratings</h3>
        <h4
          className={`${
            props.isAverageRatingGreater
              ? "brand__comparison__solved-count__greater"
              : "brand__comparison__solved-count__smaller"
          }`}
        >
          {props.averageRating}
        </h4>
      </div>
      <div className="brand__comparison__satisfaction-rate">
        <h3>Satisfaction Rate</h3>
        <h4
        className={`${
            props.isSatisfactionRateGreater
              ? "brand__comparison__satisfaction-rate__greater"
              : "brand__comparison__satisfaction-rate__smaller"
          }`}
        >{  props.satisfactionRate }%</h4>
      </div>
    </div>
  );
};

export default BrandComparisonDetail;
