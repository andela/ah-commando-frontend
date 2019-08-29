/* eslint-disable react/button-has-type */
import React from 'react';
import { PropTypes } from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const { label, handleClick } = props;
  /* istanbul ignore next */
  return (
    <div className="btn-container">
      <button onClick={() => handleClick()}>{label}</button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  label: '',
  handleClick: () => {},
};

export default Button;
