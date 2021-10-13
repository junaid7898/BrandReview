import React from "react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function CustomButton({ direction, handleClick, disabled }) {
  return (
    <i
      onClick={handleClick}
      style={{
        padding: "0px 10px",
        fontWeight: "bold",
      }}
      className={
        disabled
          ? "date__picker__cursor-default"
          : "date__picker__cursor-pointer"
      }
    >
      {direction === "right" ? (
        <FaAngleRight size={30} color={disabled ? "gray" : "#357BCE"} />
      ) : (
        <FaAngleLeft size={30} color={disabled ? "gray" : "#357BCE"} />
      )}
    </i>
  );
}

function CustomHeader() {
  return (
    <div className="date__picker__custom-header">
      <h1>Calender</h1>
    </div>
  );
}

const MultiDatePicker = () => {
  // TODO take this value state as a prop, there will be two attributes value, setvalue
  const [value, setValue] = useState(new Date().toISOString().split("T")[0]);
  const handleDate = (value) => {
    let dateFrom, dateTo;
    dateFrom = value.toString().split(",", 1).toString();
    console.log("from: " + dateFrom);
    dateTo = value.toString().split(",")[1];
    console.log("to: " + dateTo);
    setValue(dateFrom, dateTo);
  };
  return (
    <div className="date__picker">
      <DatePicker
        id="datePicker"
        placeholder="click to open"
        className="date__picker__custom-calender"
        title="Select Date"
        value={value}
        onChange={(value) => handleDate(value)}
        multiple={true}
        range={true}
        containerClassName="date__picker__picked-dates"
        arrowClassName="date__picker__arrow"
        inputClass="date__picker__input"
        maxDate={new Date()}
        renderButton={<CustomButton />}
        plugins={[<CustomHeader position="top" />]}
        disableMonthPicker = {true}
        disableYearPicker = {true}
      />
      <label className="date__picker__icon" htmlFor="datePicker">
        <AiOutlineCalendar size={24} color="#357BCE" />
      </label>
    </div>
  );
};

export default MultiDatePicker;
