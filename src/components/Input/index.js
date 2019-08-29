/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@Components/Icon';
import Button from '@Components/Button';
import './Input.scss';

const Input = (props) => {
  const { handleChange, field } = props;
  /* istanbul ignore next */
  return (
    <div className="input-container">
      <label>{field.label}</label>
      <input onChange={() => { handleChange(); }} type={`${field.type || 'text'}`} />
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
  handleChange: PropTypes.func,
  field: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
  }),
};

Input.defaultProps = {
  handleChange: () => {},
  field: {
    label: '',
    type: '',
  },
};

export { Search };
export default Input;
