/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Button from './';

let wrapper;
const shallowRender = () => {
  const label = 'firstName';
  const handleClick = () => 'I was clicked';
  const component = shallow(<Button label={label} handleClick={handleClick} />);
  return component;
};

describe('Button component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should not throw a warning with the correct prop type', () => {
    const expectedProps = {
      label: 'input text',
      onClick: () => 'I was clicked',
    };
    const error = checkPropTypes(Button.propTypes, expectedProps, 'props', Button.name);
    expect(error).toBeUndefined();
  });

  it('should render a .btn-container class', () => {
    expect(wrapper.find('.btn-container')).toHaveLength(1);
  });
});
