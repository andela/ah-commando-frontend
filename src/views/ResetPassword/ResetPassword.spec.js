import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { ResetPassword } from '@Views/ResetPassword/ResetPassword';

chai.should();

let wrapper, instance, state, props;

const shallowRender = () => {
  props = {
    history: {
      push: jest.fn(),
    },
    ui: {
      loading: false,
    },
    passwordReset: jest.fn(),
  };
  const component = shallow(<ResetPassword {...props} />);
  return component;
};

describe('Password reset component', () => {
  beforeEach(() => {
    state = {
      password: '',
      token: '',
      id: '',
      showPassword: false,
      confirmPassword: '',
      error: {},
    };
    wrapper = shallowRender();
    wrapper.setState(state);
    instance = wrapper.instance();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should toggle password', () => {
    instance.togglePassword('showPassword');
    wrapper.state().showPassword.should.equal(true);
  });

  it('should handle input change', () => {
    const e = {
      target: {
        name: 'password',
        value: 'Banke@1920',
      },
    };
    instance.handleChange(e);
    wrapper.state().password.should.equal(e.target.value);
  });

  it('should validate password', () => {
    instance.validatePassword();
  });

  it('test submit', () => {
    const e = {
      preventDefault: jest.fn(),
      target: {
        name: 'password',
        value: 'Banke@1920',
      },
    };
    instance.handleSubmit(e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('test confirmPassword()', () => {
    const result = instance.confirmPassword('foo', 'bar');
    result.should.equal('Passwords do not match');
  });

  it('test confirmPassword()', () => {
    const result = instance.confirmPassword('foo', 'foo');
    result.should.equal('');
  });
});
