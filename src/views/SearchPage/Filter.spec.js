/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import checkPropTypes from 'check-prop-types';
import { Filter } from './Filter';
import FilterComponents from './FilterComponents';

const {
  CategorySelection, FilterContainer, Selection, DropMenu,
} = FilterComponents;
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
    searchResults: [],
  },
};

const shallowRender = () => {
  const component = shallow(<Filter {...props} />);
  return component;
};

describe('Article component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render CategorySelection without crashing', () => {
    shallow(<CategorySelection name="Health" handleChange={() => 'i was clicked'} />);
  });

  it('should render FilterContainer without crashing', () => {
    shallow(<FilterContainer
      handleClick={() => 'i was clicked'}
      handleChange={() => 'I was changed'}
      display="authors"
      filtername="authors"
      selections={['one', 'two']}
      IconClick={() => 'handle icon click'}
    />);
  });

  it('should render Selection without crashing', () => {
    shallow(<Selection
      name="name"
      handleClick={() => 'I was clicked'}
      field="field"
    />);
  });

  it('should render DropMenu without crashing', () => {
    shallow(<DropMenu
      header="header"
      handleClick={() => 'I was clicked'}
    />);
  });
  // it('should not throw a warning with the correct prop type', () => {
  //   const expectedProps = {
  //     type: 'vertical',
  //     data,
  //   };
  //  const error = checkPropTypes(ArticleCard.propTypes, expectedProps, 'props', ArticleCard.name);
  //   expect(error).toBeUndefined();
  // });

  // it('should render a .image-container class', () => {
  //   expect(wrapper.find('.image-container')).toHaveLength(1);
  // });

  // it('should render a .article-details class', () => {
  //   expect(wrapper.find('.article-details')).toHaveLength(1);
  // });
});
