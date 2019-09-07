import React from 'react';
import { shallow } from 'enzyme';
import { SearchBody } from './SearchBody';

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
    shallowRender();
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
});
