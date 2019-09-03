/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import checkPropTypes from 'check-prop-types';
// eslint-disable-next-line import/named
import { Pager, Arrows, Page } from './Pager';

let wrapper, instance;
const buildStore = configureStore();
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
  updatePageNumber: jest.fn(),
};

let store;

const shallowRender = () => {
  const component = shallow(<Pager {...props} />);
  return component;
};

describe('Article component test', () => {
  beforeEach(() => {
    // store = buildStore(initialState);
    wrapper = shallowRender();
    instance = wrapper.instance();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render Arrow component without crashing', () => {
    shallow(<Page hnadleClick={() => 'I was clikced'}>2</Page>);
  });

  it('should render Arrow component without crashing', () => {
    shallow(<Arrows direction="up" />);
  });
  // it('should not throw a warning with the correct prop type', () => {
  //   const expectedProps = {
  //     type: 'vertical',
  //     data,
  //   };
  //  const error = checkPropTypes(ArticleCard.propTypes, expectedProps, 'props', ArticleCard.name);
  //   expect(error).toBeUndefined();
  // });

  it('should render a .pager_container class', () => {
    expect(wrapper.find('.title')).toHaveLength(1);
  });

  // it('should render a .article-details class', () => {
  //   expect(wrapper.find('.article-details')).toHaveLength(1);
  // });

  it('should render a .pager_container class', () => {
    instance.updatePageNumber(7);
    instance.previousPage();
    instance.nextPage();
    instance.displayPages(7);
    expect(props.updatePageNumber).toHaveBeenCalled();
  });
});
