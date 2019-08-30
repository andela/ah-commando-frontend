/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@Components/Icon';
import Button from '@Components/Button';
import './Input.scss';

const Input = (props) => {
  const {
    handleChange,
    type,
    name,
    value,
    placeholder,
    label,
  } = props;
  /* istanbul ignore next */
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        onChange={handleChange}
        type={`${type || 'text'}`}
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </div>
  );
};

const Search = () => (
  <div className="search-container">
    <input type="text" placeholder="Search..." />
    <Button>
      <Icon name="search" />
    </Button>
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Input.defaultProps = {
  placeholder: '',
};

export { Search };
export default Input;
