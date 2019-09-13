/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import { findByTestAttribute } from '@Utils/';


const shallowRender = (props) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header component', () => {
  let wrapper;
  const expectedprops = {
    signIn: jest.fn(),
    signUp: jest.fn(),
    updateSearchQuery: jest.fn(),
    getFilteredArticles: jest.fn(),
    updatePageNumber: jest.fn(),
    getNotifications: jest.fn(),
    getProfile: jest.fn(),
    history: {
      location: {
        pathname: '/',
      },
      push: jest.fn(),
    },
    profile: {
      user: {
        image: '',
      },
    },
    notifications: {
      notifications: [],
    },
  };
  beforeEach(() => {
    wrapper = shallowRender(expectedprops);
  });

  it('should render the header component without crashing', () => {
    const component = findByTestAttribute(wrapper, 'headerComponent');
    expect(component.length).toBe(1);
  });

  it('should render the navigation component without crashing', () => {
    const component = findByTestAttribute(wrapper, 'navigationComponent');
    expect(component.length).toBe(1);
  });

  describe('handle modal pop up for signin and signup', () => {
    beforeEach(() => {
      wrapper = shallow(<Header {...expectedprops} />);
    });

    it('should open signup modal', () => {
      const signUpBtn = wrapper.find('[datatest="signup-button"]');
      signUpBtn.simulate('click');
      expect(expectedprops.signUp).toMatchSnapshot();
    });

    it('should test handleClick function', () => {
      const instance = wrapper.instance();
      const btn = wrapper.find('.searchButton');
      btn.simulate('click');
      instance.handleClick = jest.fn();
      instance.handleClick();
      expect(instance.handleClick).toHaveBeenCalled();
    });

    it('should test handlekeyUp function', () => {
      const instance = wrapper.instance();
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
      instance.handleKeyUp = jest.fn();
      instance.handleKeyUp(e);
      expectedprops.getFilteredArticles(e.target.value);
      expectedprops.updatePageNumber(1);
      expectedprops.updateSearchQuery(e.target.value);
      expectedprops.history.push('/search');
      expect(instance.handleKeyUp).toHaveBeenCalled();
    });

    it('should test handleBlur function', () => {
      const instance = wrapper.instance();
      instance.state = {
        search: true,
      };
      expect(instance.state.search).toBe(true);
      instance.handleBlur = jest.fn();
      instance.handleBlur();
      expect(instance.handleBlur).toHaveBeenCalled();
    });

    it('should test the open search function', () => {
      const instance = wrapper.instance();
      const searchButton = wrapper.find('[datatest="search-icon"]');
      searchButton.simulate('click');
      expect(instance.state.search).toBe(true);
    });
  });
});
