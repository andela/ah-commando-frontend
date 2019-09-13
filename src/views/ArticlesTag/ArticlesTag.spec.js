import React from 'react';
import { shallow } from 'enzyme';
import { ArticleTags, ArticlewithTags } from './ArticlesTag';


const props = {
  articles: [{}, {}],
  getVerticalCards: jest.fn(),
};

const tagProps = {
  tag: {
    articles: [{}, {}],
    suppliedTag: '',
  },
};

let wrapper, instance;


const shallowRender = () => {
  const component = shallow(<ArticleTags {...tagProps} />);
  return component;
};

describe('Article component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
    instance = wrapper.instance();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render ArticleDisplay component without crashing', () => {
    shallow(<ArticlewithTags {...props} />);
    instance.getVerticalCards = jest.fn();
  });
});
