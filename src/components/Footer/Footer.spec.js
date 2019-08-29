/* eslint-disable react/forbid-foreign-prop-types */

import React from 'react';
import { shallow } from 'enzyme';
import Footer from './';

let wrapper;
const shallowRender = () => {
  const component = shallow(<Footer />);
  return component;
};

describe('Footer component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a footer-container class', () => {
    expect(wrapper.find('.footer-container')).toHaveLength(1);
  });

  it('should render a footer-labels class', () => {
    expect(wrapper.find('.footer-labels')).toHaveLength(1);
  });
});
