/* eslint-disable react/button-has-type */
import React from 'react';
import { PropTypes } from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const { label, handleClick, children } = props;
  /* istanbul ignore next */
  return (
    <div className="btn-container">
      <button onClick={() => handleClick()}>{children || label}</button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  label: '',
  handleClick: () => {},
  children: 'button',
};

export default Button;
