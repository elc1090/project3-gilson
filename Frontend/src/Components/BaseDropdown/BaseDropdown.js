import React, { useState, useRef, useEffect } from "react";
import "./BaseDropdown.css";

function BaseDropdown({ value, setValue, label, icon, children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [noneSelection, setNoneSelection] = useState(true);
  const dropdownRef = useRef(null);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setNoneSelection(event.target.value === "");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={`select-group field`} ref={dropdownRef}>
      <select
        className={`select-field ${noneSelection ? "none-selection" : ""}`}
        name={label}
        id={label}
        value={value}
        onChange={handleInputChange}
        readOnly
        required
        onClick={toggleDropdown}
      >
        <option defaultValue={""} disabled></option>
        {React.Children.map(children, (child) => (
          <option key={child.props.value} value={child.props.value}>
            {child.props.value}
          </option>
        ))}
      </select>
      <label htmlFor={label} className="select-label">
        {" "}
        <i className={icon}></i> {label}
      </label>
      <i
        className={`fas fa-arrow-down toggle-dropdown ${
          isDropdownOpen ? "open" : ""
        }`}
        onClick={toggleDropdown}
      ></i>
    </div>
  );
}

export default BaseDropdown;
