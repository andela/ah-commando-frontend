import React from 'react';
import { shallow } from 'enzyme';
import { PasswordRequest } from '@Components/Forms/PasswordRequest/PasswordRequest';

let wrapper, instance;
const props = {
  close: jest.fn(),
  ui: {
    modalOpen: true,
    modal: 'passwordModal',
  },
  handleChange: jest.fn(),
  closeModal: jest.fn(),
  handleSubmit: jest.fn(),
};

const shallowRender = () => {
  const component = shallow(<PasswordRequest {...props} />);
  return component;
};

describe('Password request component', () => {
  beforeEach(() => {
    wrapper = shallowRender();
    instance = wrapper.instance();
  });

  it('should render without crashing', () => {
    shallowRender();
  });

  it('should render a .form class', () => {
    expect(wrapper.find('.form')).toHaveLength(1);
  });

  it('should handle input change', () => {
    const e = {
      target: {
        name: 'email',
        value: 'kafee@gmail.com',
      },
    };
    instance.handleChange(e);
    expect(instance.state.email).toBe(e.target.value);
  });

  it('should close modal', () => {
    instance.closeModal();
    expect(props.close).toHaveBeenCalled();
  });

  it('should handle form submit', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    instance.handleSubmit(e);
    expect(props.close).toHaveBeenCalled();
  });
});
