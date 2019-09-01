/* eslint-disable react/button-has-type */
import React from 'react';
import { PropTypes } from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const {
    label,
    handleClick,
    children,
    type,
    disabled,
  } = props;
  /* istanbul ignore next */
  return (
    <div className="btn-container">
      <button disabled={disabled} type={type} onClick={handleClick}>{children || label}</button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  label: '',
  children: null,
  type: '',
  disabled: false,
};

export default Button;
