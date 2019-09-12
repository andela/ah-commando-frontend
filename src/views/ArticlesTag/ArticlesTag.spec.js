import React from 'react';
import { shallow } from 'enzyme';
import { ArticleTags, ArticlewithTags } from './ArticlesTag';


const props = {
  articles: [{}, {}],
};

const tagProps = {
  tag: {
    articles: [{}, {}],
    suppliedTag: '',
  },
};


const shallowRender = () => {
  const component = shallow(<ArticleTags {...tagProps} />);
  return component;
};

describe('Article component test', () => {
  beforeEach(() => {
    shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render ArticleDisplay component without crashing', () => {
    shallow(<ArticlewithTags {...props} />);
  });
});
