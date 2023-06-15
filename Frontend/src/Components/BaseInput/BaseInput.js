/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./BaseInput.css";

function BaseInput({ placeholder, value, setValue, label, icon, type }) {
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="form-group field">
      <input
        type={type}
        className="form-field"
        placeholder={placeholder}
        name={label}
        id={label}
        onChange={handleInputChange}
        value={value}
        required
      />
      <label htmlFor={label} className="form-label">
        {" "}
        <i className={icon}></i> {label}
      </label>
    </div>
  );
}

export default BaseInput;
