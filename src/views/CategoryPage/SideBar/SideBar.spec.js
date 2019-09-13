import React from 'react';
import { shallow } from 'enzyme';
import { SideBar, Item } from './SideBar';

let wrapper, instance;
const props = {
  getCategoryArticles: jest.fn(),
  updateCategory: jest.fn(),
  updateMenuItem: jest.fn(),
  location: {
    search: 'https://',
  },
  category: {
    selectedIndex: 1,
  },
};

const shallowRender = () => {
  const component = shallow(<SideBar {...props} />);
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

  it('should render Item component without crashing', () => {
    const callBack = jest.fn();
    const div = shallow(
      <Item
        category="fashion"
        handleClick={callBack}
        activeMenu={callBack}
        selected
      />,
    );
    div.find('h4').simulate('click');
    expect(callBack.mock.calls.length).toEqual(2);
  });

  it('should render Item component without crashing', () => {
    const callBack = jest.fn();
    shallow(
      <Item
        category="fashion"
        handleClick={callBack}
        activeMenu={callBack}
        selected={false}
      />,
    );
  });

  it('should call all methods', () => {
    instance.getArticleCategory('fashion');
    instance.updateSelectedMenu(1);
    instance.componentDidMount();
    expect(props.getCategoryArticles).toHaveBeenCalled();
  });
});
