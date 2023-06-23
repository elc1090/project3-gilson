import React from 'react';
import './StyledInput.css';

function StyledInput({
  placeholder,
  value,
  setValue,
  label,
  labelType,
  type,
  icon,
  onKeyUp,
}) {
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  function isDefaultLabel() {
    if ((label && !labelType) || (label && labelType === 'default')) {
      return true;
    }

    return false;
  }

  function isInsideLabel() {
    if ((label || icon) && labelType === 'insideLabel') {
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
          (label || icon) &&
          labelType === 'insideLabel' && (
            <span className="inside-label">
              <i className={icon}></i> {label}
            </span>
          )
        )}

        <input
          className={`styled-input ${
            labelType === 'insideLabel' ? 'inside-label-padding' : ''
          }`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  );
}

export default StyledInput;
