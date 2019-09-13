import React from 'react';
import { shallow } from 'enzyme';
import { CategoryBody, ArticleDisplay } from './CategoryBody';

const props = {
  category: {
    clickedCategory: 'technology',
    technology: [{}],
  },
};

const props2 = {
  articles: [{}, {}],
};

const props3 = {
  category: {
    clickedCategory: 'technology',
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
});
