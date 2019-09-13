import React from 'react';
import { shallow } from 'enzyme';
import CategoryPage from './';

let wrapper;
const shallowRender = () => {
  const component = shallow(<CategoryPage />);
  return component;
};

describe('SearchPage component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a .category-page class', () => {
    expect(wrapper.find('.category-page')).toHaveLength(1);
  });

  it('should render a .header className', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('should render a .sidebar class', () => {
    expect(wrapper.find('.sidebar')).toHaveLength(1);
  });

  it('should render a .footer class', () => {
    expect(wrapper.find('.footer')).toHaveLength(1);
  });

  it('should render a body element', () => {
    expect(wrapper.find('.body')).toHaveLength(1);
  });
});
