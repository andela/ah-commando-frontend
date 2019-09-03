/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

let wrapper;

const shallowRender = () => {
  const props = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header component', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a .header-top class', () => {
    expect(wrapper.find('.header-top')).toHaveLength(1);
  });
});
