/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import { findByTestAttribute } from '@Utils/';


const shallowRender = () => {
  const props = {
    signIn: jest.fn(),
    signUp: jest.fn(),
    updateSearchQuery: jest.fn(),
    getFilteredArticles: jest.fn(),
    updatePageNumber: jest.fn(),
    history: {
      location: {
        pathname: '/',
      },
    },
  };
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render the header component without crashing', () => {
    const component = findByTestAttribute(wrapper, 'headerComponent');
    expect(component.length).toBe(1);
  });

  it('should render the navigation component without crashing', () => {
    const component = findByTestAttribute(wrapper, 'navigationComponent');
    expect(component.length).toBe(1);
  });
});

describe('handle modal pop up for signin and signup', () => {
  const props = {
    signIn: jest.fn(),
    signUp: jest.fn(),
    updateSearchQuery: jest.fn(),
    getFilteredArticles: jest.fn(),
    updatePageNumber: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = shallow(<Header {...props} />);
  const instance = wrapper.instance();
  it('should open signup modal', () => {
    const signUpBtn = wrapper.find('[datatest="signup-button"]');
    signUpBtn.simulate('click');
    expect(props.signUp).toMatchSnapshot();
  });
  it('should test handleClick function', () => {
    const btn = wrapper.find('.searchButton');
    btn.simulate('click');
    instance.handleClick = jest.fn();
    instance.handleClick();
    expect(instance.handleClick).toHaveBeenCalled();
  });
  it('should test handlekeyUp function', () => {
    instance.state = {
      search: true,
    };
    expect(instance.state.search).toBe(true);
    const e = {
      keyCode: 13,
      target: {
        value: 'not-empty',
      },
    };
    const input = wrapper.find('[datatest="input-search"]');
    input.simulate('keyup', e);
    instance.handleKeyUp = jest.fn();
    instance.handleKeyUp(e);
    props.getFilteredArticles(e.target.value);
    props.updatePageNumber(1);
    props.updateSearchQuery(e.target.value);
    props.history.push('/search');
    expect(instance.handleKeyUp).toHaveBeenCalled();
  });
  it('should test handleBlur function', () => {
    instance.state = {
      search: true,
    };
    expect(instance.state.search).toBe(true);
    const input = wrapper.find('[datatest="input-search"]');
    input.simulate('blur');
    instance.handleBlur = jest.fn();
    instance.handleBlur();
    expect(instance.handleBlur).toHaveBeenCalled();
  });
});
