import React from "react";

const DetailTag = ({ label, value, class1, isPhoneNumber, verification }) => {
  return (
    <div className={class1}>
      <label>{label}</label>
      {isPhoneNumber ? (
        <p
          className={`detail__tag__phone ${
            verification
              ? `detail__tag__phone-verified`
              : `detail__tag__phone-unverified`
          }`}
        >
          {value ? value : "----"}
        </p>
      ) : (
        <p>{value ? value : "----"}</p>
      )}
    </div>
  );
};

export default DetailTag;
