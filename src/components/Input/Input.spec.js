/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Input from './';

let wrapper;
const shallowRender = () => {
  const handleChange = () => 'I am a function';
  const field = {
    label: 'username',
    type: 'text',
  };
  const component = shallow(<Input handleChange={handleChange} field={field} />);
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
      onChange: () => 'i am a function',
      field: {
        label: 'text string',
        type: 'text string',
      },
    };

    const error = checkPropTypes(Input.propTypes, expectedProps, 'props', Input.name);
    expect(error).toBeUndefined();
  });


  it('should render a .input-container class', () => {
    expect(wrapper.find('.input-container')).toHaveLength(1);
  });
});
