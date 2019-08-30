/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Input from './';

let wrapper;
const shallowRender = () => {
  const props = {
    handleChange: jest.fn(),
    type: 'text',
    name: 'email',
    value: 'john@doe.com',
    placeholder: 'random text',
    label: 'random label',
  };

  const component = shallow(<Input {...props} />);
  return component;
};

describe('Input component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should not throw a warning with the correct prop type', () => {
    const expectedProps = {
      handleChange: jest.fn(),
      type: 'text',
      name: 'email',
      value: 'john@doe.com',
      placeholder: 'random text',
      label: 'random label',
    };

    const error = checkPropTypes(Input.propTypes, expectedProps, 'props', Input.name);
    expect(error).toBeUndefined();
  });


  it('should render a .input-container class', () => {
    expect(wrapper.find('.input-container')).toHaveLength(1);
  });
});
