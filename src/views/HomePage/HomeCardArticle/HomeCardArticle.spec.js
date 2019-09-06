import React from 'react';
import { shallow } from 'enzyme';
import { HomePageArticles } from './HomeCardArticle';

import { findByTestAttribute, checkProps } from '@Utils/';

const setUp = (props = {}) => {
  const component = shallow(<HomePageArticles {...props} />);
  return component;
};

describe('HomeCardComponent component tests', () => {
  let expectedprops;
  describe('Checking propTypes', () => {
    it('should not throw a warning', () => {
      expectedprops = {
        homePageArticles: {
          featuredArticle: {
            image: 'image.com',
            title: 'title',
            author: {
              firstname: 'author',
              lastname: 'test',
              image: 'pixel',
            },
            likes: 12,
            dislikes: 3,
            comment: [{
              elelemt: 1,
            }],
            readTime: 3,
          },
        },
      };

      const propsErr = checkProps(HomePageArticles, HomePageArticles.PropTypes, expectedprops);

      expect(propsErr).toBeUndefined();
    });
  });

  describe('Should render with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp(expectedprops);
    });

    it('should render without error', () => {
      const component = findByTestAttribute(wrapper, 'homearticleComponent');
      expect(component.length).toBe(1);
    });

    it('Should test the onError image method, and update state', () => {
      wrapper.find('[test="imgtest"]').simulate('error');
      const appInstance = wrapper.instance();
      const { state: { loading, error } } = appInstance;
      expect(loading).toBe(1);
      expect(error).toBe(true);
    });

    it('successfully calls the onLoad handler', () => {
      wrapper.find('[test="imgtest"]').simulate('load');
      const appInstance = wrapper.instance();
      const { state: { loading } } = appInstance;
      expect(loading).toBe(1);
    });

    it('should render with empty author image', () => {
      expectedprops.homePageArticles.featuredArticle.author.image = null;
      const emptyProp = {
        homePageArticles: expectedprops.homePageArticles,
      };
      const componentWrapper = setUp(emptyProp);
      const image = componentWrapper.find('[data-test="autorImage"]');
      expect(image.props().src).toBe('https://res.cloudinary.com/drdje1skj/image/upload/v1567427029/profile-placeholder_gvxkia.gif');
    });

    it('should render loading div with empty prop objects', () => {
      const emptyProp = {
        homePageArticles: {
          featuredArticle: {
            title: '',
          },
        },
      };
      const loadingWrapper = setUp(emptyProp);
      const component = findByTestAttribute(loadingWrapper, 'loadingComponent');
      expect(component.length).toBe(1);
    });
  });
});
