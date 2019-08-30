/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Button from './';

let wrapper;
const shallowRender = () => {
  const props = {
    label: '',
    handleClick: jest.fn(),
    children: null,
    type: 'submit',
  };
  const component = shallow(<Button {...props} />);
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
      label: '',
      handleClick: jest.fn(),
      children: null,
      type: 'submit',
    };
    const error = checkPropTypes(Button.propTypes, expectedProps, 'props', Button.name);
    expect(error).toBeUndefined();
  });

  it('should render a .btn-container class', () => {
    expect(wrapper.find('.btn-container')).toHaveLength(1);
  });
});
