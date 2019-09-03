import React from 'react';
import { shallow } from 'enzyme';
import PasswordReset from './';

let wrapper;
const props = {
  close: jest.fn(),
};

const shallowRender = () => {
  const component = shallow(<PasswordReset close={props.close} />);
  return component;
};

describe('Password reset component', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a .form class', () => {
    expect(wrapper.find('.form')).toHaveLength(1);
  });
});
