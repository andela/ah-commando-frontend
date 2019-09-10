/* eslint-disable react/prop-types */
import React from 'react';
import './TextArea.scss';

const TextArea = (props) => {
  const {
    name,
    value,
    type,
    label,
    error,
    handleChange,
    style,
  } = props;
  return (
    <div style={style} className="textarea-container">
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        type={type}
        onChange={handleChange}
      />
      <div className="error-div">
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
