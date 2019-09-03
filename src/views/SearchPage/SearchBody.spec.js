/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/named
import { SearchBody } from './SearchBody/';

let wrapper;
const props = {
  filters: {
    searchQuery: '',
    page: 1,
    displayFields: {
      categories: 'show',
      authors: 'show',
      tags: 'show',
    },
    updateFields: {
      categories: [],
      authors: [],
      tags: [],
    },
    searchResults: [1, 1, 1, 1, 1, 1],
  },
};

const props2 = {
  filters: {
    searchQuery: '',
    page: 1,
    displayFields: {
      categories: 'show',
      authors: 'show',
      tags: 'show',
    },
    updateFields: {
      categories: [],
      authors: [],
      tags: [],
    },
    searchResults: ['No result found'],
  },
};

const props3 = {
  filters: {
    searchQuery: '',
    page: 10,
    displayFields: {
      categories: 'show',
      authors: 'show',
      tags: 'show',
    },
    updateFields: {
      categories: [],
      authors: [],
      tags: [],
    },
    searchResults: [],
  },
};

const props4 = {
  filters: {
    searchQuery: '',
    page: 1,
    displayFields: {
      categories: 'show',
      authors: 'show',
      tags: 'show',
    },
    updateFields: {
      categories: [],
      authors: [],
      tags: [],
    },
    searchResults: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
};

const shallowRender = () => {
  const component = shallow(<SearchBody {...props} />);
  return component;
};

describe('Article component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render Arrow component without crashing', () => {
    shallow(<SearchBody {...props2} />);
  });

  it('should render Arrow component without crashing', () => {
    shallow(<SearchBody {...props3} />);
  });

  it('should render Arrow component without crashing', () => {
    shallow(<SearchBody {...props4} />);
  });
  // it('should render Arrow component without crashing', () => {
  //   shallow(<Arrows direction="up" />);
  // });
  // it('should not throw a warning with the correct prop type', () => {
  //   const expectedProps = {
  //     type: 'vertical',
  //     data,
  //   };
  //  const error = checkPropTypes(ArticleCard.propTypes, expectedProps, 'props', ArticleCard.name);
  //   expect(error).toBeUndefined();
  // });

  // it('should render a .pager_container class', () => {
  //   expect(wrapper.find('.title')).toHaveLength(1);
  // });

  // it('should render a .article-details class', () => {
  //   expect(wrapper.find('.article-details')).toHaveLength(1);
  // });
});
