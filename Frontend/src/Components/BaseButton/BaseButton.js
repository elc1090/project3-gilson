import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./BaseButton.css";

const BaseButton = React.forwardRef(
  ({ iconOnly, icon, children, type, onClick, id }, ref) => {
    return (
      <button
        id={id}
        ref={ref}
        type={type}
        className={"base-btn " + type}
        onClick={onClick}
      >
        {iconOnly && <i className={icon}></i>}
        {!iconOnly && icon && <i className={icon}></i>}
        {!iconOnly && children && children}
      </button>
    );
  }
);

export default BaseButton;
