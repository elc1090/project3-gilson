import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './BaseButton.css';

function BaseButton({iconOnly, icon, children, type, onClick}) {
  return (
    <button type={type} className={'base-btn ' + type} onClick={onClick}>
      {iconOnly && <i className={icon}></i>}
      {!iconOnly && icon && <i className={icon}></i>}
      {!iconOnly && children && children}
    </button>
  );
}

export default BaseButton;
