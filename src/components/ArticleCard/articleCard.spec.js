/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import ArticleCard from './';

let wrapper;
const data = {
  image: 'image',
  title: 'title',
  authorName: 'authorname',
  likes: 12,
  dislikes: 3,
  comments: 28,
  readTime: 3,
};
const shallowRender = () => {
  const component = shallow(<ArticleCard type="horizontal" data={data} />);
  return component;
};

describe('Article component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should not throw a warning with the correct prop type', () => {
    const expectedProps = {
      type: 'vertical',
      data,
    };
    const error = checkPropTypes(ArticleCard.propTypes, expectedProps, 'props', ArticleCard.name);
    expect(error).toBeUndefined();
  });

  it('should render a .image-container class', () => {
    expect(wrapper.find('.image-container')).toHaveLength(1);
  });

  it('should render a .article-details class', () => {
    expect(wrapper.find('.article-details')).toHaveLength(1);
  });
});
