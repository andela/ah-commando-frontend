/* eslint-disable react/require-default-props */
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
    style,
    id,
  } = props;
  return (
    <div className="btn-container">
      <button
        style={style}
        disabled={disabled}
        type={type}
        onClick={handleClick}
        id={id}
      >
        <div>
          {children || label}
        </div>
      </button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  id: PropTypes.string,
  style: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.string,
  }),
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  label: '',
  children: null,
  style: null,
  type: '',
  disabled: false,
  id: '',
};

export default Button;
