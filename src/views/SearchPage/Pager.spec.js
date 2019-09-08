import React from 'react';
import { shallow } from 'enzyme';
import { Pager, Arrows, Page } from './Pager';

let wrapper, instance;
const props = {
  filters: {
    searchQuery: '',
    page: 3,
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
    searchResults: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  updatePageNumber: jest.fn(),
};

const shallowRender = () => {
  const component = shallow(<Pager {...props} />);
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

  it('should render Arrow component without crashing', () => {
    const callBack = jest.fn();
    const div = shallow(<Page handleChange={callBack}>2</Page>);
    div.find('div').simulate('click');
    expect(callBack.mock.calls.length).toEqual(1);
  });

  it('should render Arrow component without crashing', () => {
    const callBack = jest.fn();
    const div = shallow(<Arrows direction="up" handleClick={callBack} />);
    div.find('div').simulate('click');
    expect(callBack.mock.calls.length).toEqual(1);
  });

  it('should render a .titleclass', () => {
    expect(wrapper.find('.title')).toHaveLength(1);
  });

  it('should call all class functions', () => {
    const wrapper = shallow(<Pager {...props2} />);
    const instance2 = wrapper.instance();
    instance.updatePageNumber(7);
    instance.previousPage();
    instance2.previousPage();
    instance.nextPage();
    instance2.nextPage();
    instance.displayPages(7);
    expect(props.updatePageNumber).toHaveBeenCalled();
  });
});
