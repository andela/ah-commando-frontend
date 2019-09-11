import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAttribute, checkProps } from '@Utils/';
import { MainCardSection } from './MainCardSection';
import data from './seedData';

const setUp = (props) => shallow(<MainCardSection {...props} />);

describe('Banner component test', () => {
  let wrapper;
  describe('Banner tests with full props', () => {
    const props = {
      homePageArticles: {
        articleCategories: [{
          name: 'technology',
          Articles: [{
            id: 1,
            image: 'image.com',
            title: 'title',
            author: {
              firstname: 'author',
              lastname: 'test',
            },
            description: 'the description',
            likesCount: 12,
            dislikesCount: 3,
            comment: [{
              elelemt: 1,
            }],
            readTime: 3,
          }],
        }],
      },
    };

    beforeEach(() => {
      wrapper = setUp(props);
    });

    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'featuredsection');
      expect(component.length).toBe(1);
    });

    it('should not throw a warning with the correct prop type', () => {
      const error = checkProps(wrapper, wrapper.protypes, props);
      expect(error).toBeUndefined();
    });
  });

  describe('Tests for class methods', () => {
    const props = {
      homePageArticles: {
        articleCategories: [{
          id: 1,
          name: 'technology',
          Articles: data,
        }],
      },
    };

    const e = {
      target: {
        parentElement: {
          nextElementSibling: {
            scrollLeft: 400,
          },
          previousElementSibling: {
            scrollLeft: 400,
          },
        },
      },
    };

    beforeEach(() => {
      wrapper = setUp(props);
    });

    it('should render loading div with empty prop objects', () => {
      const emptyProp = {
        homePageArticles: {
          articleCategories: [],
        },
      };
      const loadingWrapper = setUp(emptyProp);
      const component = findByTestAttribute(loadingWrapper, 'loadingComponent');
      expect(component.length).toBe(1);
    });

    it('should not render a category with empty articles', () => {
      const emptyProp = {
        homePageArticles: {
          articleCategories: [{
            id: 1,
            name: 'technology',
            Articles: [],
          }],
        },
      };
      const loadingWrapper = setUp(emptyProp);
      const component = findByTestAttribute(loadingWrapper, 'noRender');
      expect(component.length).toBe(1);
    });

    it('successfully calls the onClick handler for left scroller', () => {
      const appInstance = wrapper.instance();
      appInstance.handleClick = jest.fn();
      wrapper.find('[data-test="leftbtn"]').simulate('click', e);
      expect(appInstance.handleClick).toHaveBeenCalled();
    });

    it('successfully calls the onClick handler for right scroller', () => {
      const appInstance = wrapper.instance();
      appInstance.handleClick = jest.fn();
      wrapper.find('[data-test="rightbtn"]').simulate('click', e);
      expect(appInstance.handleClick).toHaveBeenCalled();
    });
  });
});
