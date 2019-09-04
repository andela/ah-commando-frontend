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
    datatest,
  } = props;
  return (
    <div className="btn-container">
      <button
        datatest={datatest}
        style={style}
        disabled={disabled}
        type={type}
        onClick={handleClick}
        datatest={datatest}
      >
        {children || label}
      </button>
    </div>
  );
};

Button.propTypes = {
  datatest: PropTypes.string,
  label: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datatest: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
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
  datatest: PropTypes.string,
  label: '',
  children: null,
  style: null,
  type: '',
  disabled: false,
};

export default Button;
