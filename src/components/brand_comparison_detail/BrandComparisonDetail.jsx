import React, { useState } from "react";
import "./brandComparisonDetails.scss";

const BrandComparisonDetail = ({ brandDetails }) => {
    console.log(brandDetails)
  return (
    <div className="brand__comparison">
      <img
        src={brandDetails.brandLogo}
        alt=""
        className="brand__comparison__logo"
      />
      <p className="brand__comparison__text">{brandDetails.brandDetail}</p>
      <div className="brand__comparison__review">
        <h3>Review Count</h3>
        <h4>{brandDetails.reviewCount}</h4>
      </div>
      <div className="brand__comparison__solved-count">
        <h3>Solved Count</h3>
        <h4
          className={`${
            brandDetails.solvedCountIsGreater
              ? "brand__comparison__solved-count__greater"
              : "brand__comparison__solved-count__smaller"
          }`}
        >
          {brandDetails.solvedCount}
        </h4>
      </div>
      <div className="brand__comparison__satisfaction-rate">
        <h3>Satisfaction Rate</h3>
        <h4
        className={`${
            brandDetails.satisfactionRateIsGreater
              ? "brand__comparison__satisfaction-rate__greater"
              : "brand__comparison__satisfaction-rate__smaller"
          }`}
        >{brandDetails.satisfactionRate}</h4>
      </div>
      <div className="brand__comparison__overall-status">
        <h3
        className={`${
            brandDetails.overAllStatusIsGreater
              ? "brand__comparison__overall-status__greater"
              : "brand__comparison__overall-status__smaller"
          }`}
        >Overall Status</h3>
        <h4
        className={`${
            brandDetails.overAllStatusIsGreater
              ? "brand__comparison__overall-status__greater"
              : "brand__comparison__overall-status__smaller"
          }`}
        >{brandDetails.overAllStatus}</h4>
      </div>
    </div>
  );
};

export default BrandComparisonDetail;
