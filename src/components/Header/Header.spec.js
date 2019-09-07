/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';


const shallowRender = () => {
  const props = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };
  const component = shallow(<Header {...props} />);
  return component;
};

describe('Header component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowRender();
  });
  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a .header-top class', () => {
    expect(wrapper.find('.header-top')).toHaveLength(1);
  });
});

describe('handle modal pop up for signin and signup', () => {
  let props;
  beforeEach(() => {
    props = {
      signIn: jest.fn(),
      signUp: jest.fn(),
    };
  });
  const wrapper = shallow(<Header {...props} />);
  it('should open signup modal', () => {
    const signUpBtn = wrapper.find('[datatest="signup-button"]');
    signUpBtn.simulate('click');
    expect(props.signUp).toMatchSnapshot();
  });
});
