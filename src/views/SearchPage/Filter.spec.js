import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from './Filter';
import FilterComponents from './FilterComponents';

const {
  CategorySelection, FilterContainer, Selection, DropMenu,
} = FilterComponents;
let wrapper, instance;
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
  },
  searchResults: [],
  getFilteredArticles: jest.fn(),
  updateFilters: jest.fn(),
  removeFilters: jest.fn(),
  displayFilters: jest.fn(),
};

const shallowRender = () => {
  const component = shallow(<Filter {...props} />);
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

  it('should render CategorySelection without crashing', () => {
    const callBack = jest.fn();
    const input = shallow(<CategorySelection name="Health" handleChange={callBack} />);
    input.find('input').simulate('change');
    expect(callBack.mock.calls.length).toEqual(1);
  });

  it('should render FilterContainer without crashing', () => {
    const callBack1 = jest.fn();
    const callBack2 = jest.fn();
    const callBack3 = jest.fn();
    const input = shallow(<FilterContainer
      handleClick={callBack1}
      handleChange={callBack2}
      display="authors"
      filtername="authors"
      selections={['one', 'two']}
      IconClick={callBack3}
    />);
    input.find('input').simulate('keyUp');
    expect(callBack2.mock.calls.length).toEqual(1);
  });

  it('should render Selection without crashing', () => {
    const callBack = jest.fn();
    const div = shallow(<Selection
      name="name"
      handleClick={callBack}
      field="field"
    />);
    div.find('div').at(1).simulate('click');
    expect(callBack.mock.calls.length).toEqual(1);
  });

  it('should render DropMenu without crashing', () => {
    const callBack = jest.fn();
    const div = shallow(<DropMenu
      header="header"
      handleClick={callBack}
    />);
    div.find('div').simulate('click');
    expect(callBack.mock.calls.length).toEqual(1);
  });

  it('should call all methods', () => {
    instance.filterResult();
    instance.handleInputChange({
      target: {
        value: '',
      },
      keyCode: 13,
      preventDefault: jest.fn(),
    }, 'field');
    instance.handleDelete('field', 'value');
    instance.handleDisplayFilters('field');
    expect(props.getFilteredArticles).toHaveBeenCalled();
  });

  it('should call the handle input method', () => {
    instance.handleInputChange({
      target: {
        value: '',
        type: 'checkbox',
      },
      keyCode: 11,
      preventDefault: jest.fn(),
    }, 'field');
    expect(props.getFilteredArticles).toHaveBeenCalled();
  });

  it('should call the handle input method', () => {
    instance.handleInputChange({
      target: {
        value: '',
        type: 'checkbox',
        checked: true,
      },
      keyCode: 11,
      preventDefault: jest.fn(),
    }, 'field');
    expect(props.getFilteredArticles).toHaveBeenCalled();
  });

  it('should call the handle input method', () => {
    instance.handleInputChange({
      target: {
        value: '',
        type: 'checkb',
        checked: true,
      },
      keyCode: 11,
      preventDefault: jest.fn(),
    }, 'field');
    expect(props.getFilteredArticles).toHaveBeenCalled();
  });
});
