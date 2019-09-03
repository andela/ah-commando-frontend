/* eslint-disable jsx-a11y/control-has-associated-label */
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
    error,
    togglable,
    visible,
    handleToggle,
  } = props;

  return (
    <div className="input">
      <div className={`input-container${error && ' error'}`}>
        <label>{label}</label>
        <input
          className={togglable ? 'toggle' : ''}
          onChange={handleChange}
          type={visible ? 'text' : type}
          placeholder={placeholder}
          name={name}
          value={value}
        />
        <div className="visibility-toggle" style={{ display: `${!togglable && 'none'}` }}>
          {togglable
            && (
              <button type="button" onClick={handleToggle}>
                <i className={`fas fa-eye${visible ? '' : '-slash'} fa-lg`} />
              </button>
            )}
        </div>
      </div>
      <div className="error-div">
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

const Search = () => (
  <div className="search-container">
    <input type="text" placeholder="Search..." />
    <Button handleClick={() => { }}>
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
  error: PropTypes.string,
  togglable: PropTypes.bool,
  visible: PropTypes.bool,
  handleToggle: PropTypes.func,
};

Input.defaultProps = {
  placeholder: '',
  error: '',
  togglable: false,
  visible: false,
  handleToggle: null,
};

export { Search };
export default Input;
