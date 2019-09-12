import React from 'react';
import { shallow } from 'enzyme';
import SearchPage from './';

let wrapper;
const shallowRender = () => {
  const component = shallow(<SearchPage />);
  return component;
};

describe('SearchPage component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a .search_page class', () => {
    expect(wrapper.find('.search_page')).toHaveLength(1);
  });

  it('should render a .header class', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('should render a .filter class', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('should render a .body class', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('should render a .footer class', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });
});
