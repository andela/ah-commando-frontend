/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { checkProps } from '@Utils/';
import Button from './';

let wrapper;
const shallowRender = () => {
  const props = {
    label: '',
    handleClick: jest.fn(),
    children: null,
    type: 'submit',
    datatest: 'test',
  };
  const component = shallow(<Button {...props} />);
  return component;
};

describe('Button component test', () => {
  beforeEach(() => {
    wrapper = shallowRender();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should not throw a warning with the correct prop type', () => {
    const expectedProps = {
      label: '',
      handleClick: jest.fn(),
      children: null,
      type: 'submit',
      datatest: 'test',
    };
    const error = checkProps(wrapper, wrapper.propTypes, expectedProps);
    expect(error).toBeUndefined();
  });

  it('should render a .btn-container class', () => {
    expect(wrapper.find('.btn-container')).toHaveLength(1);
  });
});
describe('handleClick events', () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      label: '',
      handleClick: sinon.spy(),
      children: null,
      type: 'submit',
      datatest: 'test',
    };
    wrapper = shallow(<Button {...props} />);
  });

  it('should handle all click cases', () => {
    const btn = wrapper.find('button');
    btn.simulate('click');
    expect(props.handleClick.calledOnce).toBe(true);
  });
});
