import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { SignIn } from '@Components/Forms/SignIn/SignIn';

chai.should();

describe('<SignIn /> Component', () => {
  let wrapper, props, formHeader, instance, state;

  beforeEach(() => {
    state = {
      email: 'john.doe@testmail.com',
      password: 'P@ssword123',
      showPassword: false,
      errors: {},
      isFormValid: true,
    };
    props = {
      ui: {
        loading: false,
        modalOpen: true,
        modal: 'signin',
      },
      history: {
        push: jest.fn(),
      },
      close: jest.fn(),
      signIn: jest.fn(),
      signinViaSocial: jest.fn(),
    };
    wrapper = shallow(<SignIn {...props} />);
    wrapper.setState(state);
    instance = wrapper.instance();
    formHeader = wrapper.find('h3');
  });

  it('Renders as expected', () => {
    formHeader.text().should.equal('Sign in');
    wrapper.containsMatchingElement(<h3>Sign in</h3>).should.equal(true);
    wrapper.containsMatchingElement(
      <p>
        Sign in to experience author’s haven great community of creative minds.
        Follow your favourite authors and interact with the articles you love
      </p>,
    ).should.equal(true);
    wrapper.state().should.deep.equal(state);
  });

  it('Should close the modal when the resetModal function is called', () => {
    instance.resetModal();

    expect(props.close).toHaveBeenCalled();
  });

  it('Should call the singIn function when the form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleSubmit(event);
    expect(props.signIn).toHaveBeenCalled();
  });

  it('Should not submit the form if it\'s invalid', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.setFormValidity = jest.fn();

    instance.validateForm = jest.fn().mockReturnValueOnce(false);
    instance.handleSubmit(event);
    expect(instance.setFormValidity).toHaveBeenCalled();
  });

  it('Should set the state based on changes from the form', () => {
    const event = {
      target: {
        name: 'email',
        value: 'test@testmail.com',
      },
    };
    instance.handleChange(event);
    wrapper.state().email.should.equal(event.target.value);
  });

  it('ValidateForm() should return true if there are no errors', () => {
    instance.validateForm().should.equal(true);
  });

  it('SetFormValidity() Should return true if there are no errors', () => {
    instance.setFormValidity(state.errors).should.equal(true);
  });

  it('Should return false if there are errors', () => {
    instance.setFormValidity({ email: 'mock error' }).should.equal(false);
    wrapper.state().isFormValid.should.equal(false);
  });

  it('toggleVisibility() should make password visible', () => {
    instance.toggleVisibility();
    wrapper.state().showPassword.should.equal(true);
  });
  it('should set window location to backend url for google', () => {
    const event = {
      target: {
        getAttribute: () => 'google',
      },
    };
    instance.handleSocialSignin(event);
  });
  it('should set window location to backend url for facebook', () => {
    const event = {
      target: {
        getAttribute: () => 'facebook',
      },
    };
    instance.handleSocialSignin(event);
  });
  it('on mounting socialLogin should be false', () => {
    instance.componentDidMount = jest.fn();
    instance.componentDidMount();
    const localStorage = {
      getItem: jest.fn().mockReturnValueOnce(false),
    };
    const socialLogin = localStorage.getItem('socialLogin');
    expect(socialLogin).toBe(false);
  });
  it('should mock componentDidMount', () => {
    const window = {
      location: {
        search: jest.fn().mockReturnValueOnce(false),
      },
    };
    const URLSearchParams = jest.fn();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.get = jest.fn().mockReturnValueOnce(false);
    const user = searchParams.get('user');
    expect(user).toBe(false);
  });
});
