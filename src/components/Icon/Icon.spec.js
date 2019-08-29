/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Icon from './';

let wrapper;
const shallowRender = () => {
  const handleClick = () => 'I was clicked';
  const name = 'search';
  const component = shallow(<Icon name={name} handleClick={handleClick} />);
  return component;
};

describe('Icon component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should not throw a warning with the correct prop type', () => {
    const expectedProps = {
      handleClick: () => 'I was clicked',
      name: 'search',
    };
    const error = checkPropTypes(Icon.propTypes, expectedProps, 'props', Icon.name);
    expect(error).toBeUndefined();
  });


  it('should render a .icon-container class', () => {
    expect(wrapper.find('.icon-container')).toHaveLength(1);
  });
});
