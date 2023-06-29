import React from "react";
import "./BaseInput.css";
import InputMask from "react-input-mask";

function BaseInput({
  placeholder,
  value,
  setValue,
  label,
  icon,
  type,
  mask,
  onKeyUp,
}) {
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="form-group field">
      <InputMask
        mask={mask}
        maskChar=" "
        placeholder={placeholder}
        name={label}
        id={label}
        onChange={handleInputChange}
        value={value}
        onKeyUp={onKeyUp}
        type={type}
        required
        className="form-field"
      />
      <label htmlFor={label} className="form-label">
        {" "}
        <i className={icon}></i> {label}
      </label>
    </div>
  );
}

export default BaseInput;
