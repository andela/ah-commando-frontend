import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAttribute, checkProps } from '@Utils/';
import { Home } from './HomePage';

const setUp = props => shallow(<Home {...props} />);

describe('HomePage component test', () => {
  let wrapper;

  describe('HomePage tests with full props', () => {
    const props = {
      homePageGet: () => { },
      homeArticleGet: () => { },
      editorsChoiceGet: () => { },
    };
    beforeEach(() => {
      wrapper = setUp(props);
    });

    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'homepageComponent');
      expect(component.length).toBe(1);
    });

    it('should not throw a warning with the correct prop type', () => {
      const error = checkProps(wrapper, wrapper.protypes, props);
      expect(error).toBeUndefined();
    });
  });

  describe('Tests for class methods', () => {
    const props = {
      homePageGet: () => { },
      homeArticleGet: () => { },
      editorsChoiceGet: () => { },
    };

    const e = {
      target: {
        parentElement: {
          nextElementSibling: {
            scrolltop: 400,
          },
          previousElementSibling: {
            scrolltop: 400,
          },
        },
      },
    };

    beforeEach(() => {
      wrapper = setUp(props);
    });

    it('successfully calls the onClick handler for top scroller', () => {
      const appInstance = wrapper.instance();
      appInstance.handleClick = jest.fn();
      wrapper.find('[data-test="topBtn"]').simulate('click', e);
      expect(appInstance.handleClick).toHaveBeenCalled();
    });

    it('successfully calls the onClick handler for bottom scroller', () => {
      const appInstance = wrapper.instance();
      appInstance.handleClick = jest.fn();
      wrapper.find('[data-test="bottomBtn"]').simulate('click', e);
      expect(appInstance.handleClick).toHaveBeenCalled();
    });
  });

  describe('Mock the props sent in click', () => {
    const mockgetArticles = jest.fn();
    const mockgetHomePageArticles = jest.fn();
    const mockgetEditorsChoice = jest.fn();

    it('Should render without failing', () => {
      const props = {
        homePageGet: mockgetArticles,
        homeArticleGet: mockgetHomePageArticles,
        editorsChoiceGet: mockgetEditorsChoice,
      };

      const Wrapper = setUp(props);
      Wrapper.instance().componentDidMount();
      expect(mockgetArticles).toHaveBeenCalled();
      expect(mockgetHomePageArticles).toHaveBeenCalled();
      expect(mockgetEditorsChoice).toHaveBeenCalled();
      Wrapper.instance().componentWillUnmount();
    });
  });
});
