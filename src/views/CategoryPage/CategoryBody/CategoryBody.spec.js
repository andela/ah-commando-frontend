import React from 'react';
import { shallow } from 'enzyme';
import { CategoryBody, ArticleDisplay } from './CategoryBody';

const moreArticle = (length) => {
  const result = [];
  for (let i = 1; i <= length; i += 1) {
    result.push({});
  }
  return result;
};

const props = {
  category: {
    clickedCategory: 'technology',
    technology: [{}, {}, {}, {}],
    page: 1,
  },
};

const props2 = {
  articles: [{}, {}],
};

const props3 = {
  category: {
    clickedCategory: 'technology',
    technology: [{}, {}, {}, {}],
    page: 1,
  },
};

const props4 = {
  category: {
    clickedCategory: 'technology',
    technology: [],
    page: 1,
  },
};

const props5 = {
  category: {
    clickedCategory: 'technology',
    technology: moreArticle(50),
    page: 1,
  },
};

const shallowRender = () => {
  const component = shallow(<CategoryBody {...props} />);
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
    shallow(<ArticleDisplay {...props2} />);
  });

  it('should render CategoryBody component without crashing', () => {
    shallow(<CategoryBody {...props3} />);
  });

  it('should render CategoryBody component without crashing', () => {
    shallow(<CategoryBody {...props4} />);
  });

  it('should render CategoryBody component without crashing', () => {
    shallow(<CategoryBody {...props5} />);
  });
});
