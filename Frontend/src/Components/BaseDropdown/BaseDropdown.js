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
      <div
        className={`select-field ${!isDropdownOpen ? "dropdown-closed" : ""} ${
          noneSelection ? "none-selection" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span className="selected-option">
          {value || ""}
        </span>
        <i
          className={`fas fa-arrow-down toggle-dropdown ${
            isDropdownOpen ? "open" : ""
          }`}
        ></i>
      </div>

      {isDropdownOpen && (
        <ul className="menu-dropdown">
          {React.Children.map(children, (child) => (
            <li
              className="dropdown-item"
              key={child.props.value}
              onClick={() => {
                setValue(child.props.value);
                setIsDropdownOpen(false);
                setNoneSelection(false);
              }}
            >
              {child.props.value}
            </li>
          ))}
        </ul>
      )}

      <label htmlFor={label} className="select-label">
        {" "}
        <i className={icon}></i> {label}
      </label>
    </div>
  );
}

export default BaseDropdown;
