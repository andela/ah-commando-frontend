import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttribute } from '@Utils/';
import ArticleCard from './';

let wrapper;
const shallowRender = (props) => {
  const component = shallow(<ArticleCard type="horizontal" {...props} />);
  return component;
};

describe('Article component test', () => {
  describe('Should render with props', () => {
    const props = {
      data: {
        image: 'image.com',
        title: 'title',
        author: {
          firstname: 'author',
          lastname: 'test',
        },
        likes: 12,
        dislikes: 3,
        comment: [{
          elelemt: 1,
        }],
        readTime: 3,
      },
    };
    beforeEach(() => {
      wrapper = shallowRender(props);
    });

    it('should render without crashing', () => {
      const component = wrapper.find('.image-container');
      expect(component.length).toBe(1);
    });

    it('should render with empty comment article', () => {
      props.data.comment = [];
      const emptyProp = {
        data: props.data,
      };
      const componentWrapper = shallowRender(emptyProp);
      const component = componentWrapper.find('.image-container');
      expect(component.length).toBe(1);
    });

    it('should render loading div with empty prop objects', () => {
      const emptyProp = {
        data: null,
      };
      const loadingWrapper = shallowRender(emptyProp);
      const component = findByTestAttribute(loadingWrapper, 'loadingComponent');
      expect(component.length).toBe(1);
    });

    it('should not throw a warning with the correct prop type', () => {
      const expectedProps = {
        type: 'vertical',
        data: props.data,
      };
      const error = checkProps(wrapper, wrapper.protypes, expectedProps);
      expect(error).toBeUndefined();
    });

    it('should render a .image-container class', () => {
      expect(wrapper.find('.image-container')).toHaveLength(1);
    });

    it('should render a .article-details class', () => {
      expect(wrapper.find('.article-details')).toHaveLength(1);
    });

    it('Should test the onError image method, and update state', () => {
      wrapper.find('img').simulate('error');
      const appInstance = wrapper.instance();
      const { state: { loading, error } } = appInstance;
      expect(loading).toBe(1);
      expect(error).toBe(true);
    });


    it('successfully calls the onLoad handler', () => {
      wrapper.find('img').simulate('load');
      const appInstance = wrapper.instance();
      const { state: { loading } } = appInstance;
      expect(loading).toBe(1);
    });
  });
});
