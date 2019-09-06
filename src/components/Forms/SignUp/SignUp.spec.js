import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { SignUp } from '@Components/Forms/SignUp/SignUp';
import {
  emailSchema,
  passwordSchema,
  firstnameSchema,
  lastnameSchema,
  usernameSchema,
} from '@Utils/';

chai.should();

describe('<SignUp /> Component', () => {
  let wrapper, props, formHeader, instance, state;
  beforeEach(() => {
    state = {
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe1_',
      email: 'john.doe@doe.com',
      password: 'Password1$',
      passwordConfirm: 'Password1$',
      showPassword: false,
      showConfirm: false,
      errors: {},
      isFormValid: true,
    };
    props = {
      ui: {
        loading: false,
        modalOpen: true,
        modal: 'signup',
      },
      history: {
        push: jest.fn(),
      },
      close: jest.fn(),
      signUp: jest.fn(),
      signinViaSocial: jest.fn(),
    };
    wrapper = shallow(<SignUp {...props} />);
    wrapper.setState(state);
    instance = wrapper.instance();
    formHeader = wrapper.find('h3');
  });

  it('Renders as expected', () => {
    formHeader.text().should.equal('Join us now');
    wrapper.containsMatchingElement(<h3>Join us now</h3>).should.equal(true);
    wrapper.containsMatchingElement(
      <p>
        Create an account, follow the adventure everywhere anywhere
      </p>,
    ).should.equal(true);
    wrapper.state().should.deep.equal(state);
  });

  it('Should close the modal when the resetModal function is called after signup', () => {
    instance.resetModal();
    expect(props.close).toHaveBeenCalled();
  });

  it('Should call the signup function when the form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleSubmit(event);
    expect(props.signUp).toHaveBeenCalled();
  });

  it('Should not submit the form if the info isnt correct', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.setFormValidity = jest.fn();
    instance.confirmPassword = jest.fn();

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

  it('confirmPassword() Should return true if password equals confirmPassword', () => {
    instance.confirmPassword('Password1$').should.equal('Passwords do not match');
  });

  it('Should return false if there are errors', () => {
    instance.setFormValidity({ email: 'mock error' }).should.equal(false);
    wrapper.state().isFormValid.should.equal(false);
  });

  it('toggleVisibility() should make password visible', () => {
    instance.toggleVisibility('showPassword');
    wrapper.state().showPassword.should.equal(true);
  });

  it('toggleVisibility() should make passwordConfirm visible', () => {
    instance.toggleVisibility('showConfirm');
    wrapper.state().showConfirm.should.equal(true);
  });

  it('Should get the right password schema', () => {
    const schema = instance.getSchema('password');
    schema.should.equal(passwordSchema);
  });

  it('Should get the right firstname schema', () => {
    const schema = instance.getSchema('firstname');
    schema.should.equal(firstnameSchema);
  });

  it('Should get the right firstname schema', () => {
    const schema = instance.getSchema('lastname');
    schema.should.equal(lastnameSchema);
  });

  it('Should get the right firstname schema', () => {
    const schema = instance.getSchema('username');
    schema.should.equal(usernameSchema);
  });

  it('Should get the right email schema', () => {
    const schema = instance.getSchema('email');
    schema.should.equal(emailSchema);
  });

  it('Should return null for the default value', () => {
    const schema = instance.getSchema();
    expect(schema).toBe(null);
  });

  it('Should not submit the form if the info isnt correct', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'passwordConfirm',
        value: 'djfkdjkjdfkjkdf',
      },
    };
    // instance.setFormValidity = jest.fn();
    // instance.confirmPassword = jest.fn();

    // instance.validateForm = jest.fn().mockReturnValueOnce(false);
    instance.confirmPassword = jest.fn();
    instance.handleSubmit(event);
    expect(instance.confirmPassword).toHaveBeenCalled();
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
});
