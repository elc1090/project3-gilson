import React from "react";
import "./BaseInput.css";

function BaseInput({ placeholder, value, setValue, label, labelType, type }) {
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  function isDefaultLabel() {
    if ((label && !labelType) || (label && labelType === "default")) {
      return true;
    }

    return false;
  }

  function isInsideLabel() {
    if (label && labelType === "insideLabel") {
      return true;
    }

    return false;
  }

  return (
    <div className="input-container">
      <div className="input-box">
        {isDefaultLabel() ? (
          <label htmlFor="inputTitle">{label}</label>
        ) : (
          isInsideLabel() &&
          label &&
          labelType === "insideLabel" && (
            <span className="inside-label">
              <label htmlFor="inputTitle">{label}</label>
            </span>
          )
        )}

        <input
          className={`base-input ${
            labelType === "insideLabel" ? "inside-label-padding" : ""
          }`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default BaseInput;
