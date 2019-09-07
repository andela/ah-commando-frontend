/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Modal from '@Components/Modal';
import Input from '@Components/Input';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import AuthStore from '@Lib/AuthStore';
import { closeModal, openModal } from '@Actions/uiActions';
import { logIn, loginViaSocial } from '@Actions/authActions';
import {
  validate, emailSchema, passwordSchema, setToken,
} from '@Utils/';
import './SignIn.scss';

const { decryptQuery } = AuthStore;
export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      errors: {},
      isFormValid: true,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.get('user') || !searchParams.get('token')) return false;
    const token = decryptQuery(searchParams.get('token'));
    const user = searchParams.get('user');
    localStorage.setItem('haven', token);
    setToken(token);
    localStorage.setItem('user', user);
    history.push('/');
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const errors = {};
    const [errorValue] = validate({
      [name]: value,
    }, name === 'password' ? passwordSchema : emailSchema);

    errors[name] = errorValue || '';
    this.setFormValidity(errors);
    this.setState({
      [name]: value,
      errors,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signIn, history } = this.props;
    const {
      email,
      password,
      errors,
    } = this.state;
    const formIsValid = this.validateForm();

    if (!formIsValid) {
      return this.setFormValidity(errors);
    }
    signIn({ email, password }, history);
  }

  validateForm = () => {
    const errors = {};
    const {
      email,
      password,
    } = this.state;
    const [emailError] = validate({ email }, emailSchema);
    const [passwordError] = validate({ password }, passwordSchema);

    errors.email = emailError || '';
    errors.password = passwordError || '';
    return this.setFormValidity(errors);
  }

  setFormValidity = (errors) => {
    let valid = true;
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        valid = false;
      }
    });
    this.setState({ isFormValid: valid });

    return valid;
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }

  resetModal = () => {
    const { close } = this.props;
    this.setState({
      email: '',
      password: '',
      showPassword: false,
      errors: {},
      isFormValid: true,
    });
    close();
  }

  handleSocialSignin = (e) => {
    const { signinViaSocial } = this.props;
    const brand = e.target.getAttribute('name');
    return signinViaSocial(brand);
  }

  render() {
    const {
      email,
      password,
      showPassword,
      errors,
      isFormValid,
    } = this.state;
    const {
      ui: {
        loading,
        modalOpen,
        modal,
      },
      requestPassword,
      showSignUpModal,
    } = this.props;
    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;

    return (
      <Modal data-test="signup-form" close={this.resetModal} open={modalOpen && modal === 'signin'}>
        <div className="form">
          <h3 className="form-header">Sign in</h3>
          <p className="form-text">
            Sign in to experience author’s haven great community of creative minds.
            Follow your favourite authors and interact with the articles you love
          </p>
          <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Input
              name="email"
              value={email}
              type="email"
              handleChange={this.handleChange}
              placeholder="john.doe@foo.bar"
              label="Email"
              error={errors.email}
            />
            <Input
              name="password"
              value={password}
              type="password"
              handleChange={this.handleChange}
              placeholder="**********"
              label="Password"
              togglable
              visible={showPassword}
              handleToggle={this.toggleVisibility}
              error={errors.password}
            />
            <Button
              datatest="loginButton"
              label={loading ? null : 'Sign In'}
              handleClick={this.handleSubmit}
              disabled={loading ? true : !isFormValid}
              type="submit"
              id="signin"
              style={{
                height: '45px',
                width: '300px',
                color: '#ffc700',
                backgroundColor: '#000',
                borderRadius: '0',
              }}
            >
              {loading && loader}
            </Button>
          </form>
          <div className="alternative-login">
            <p>Or create an account Using:</p>
            <div className="social-login">
              <span name="google" id="google" onClick={this.handleSocialSignin}>
                <i className="fab fa-google fa-lg" style={{ color: 'red' }} onClick={this.handleSocialSignin} name="google" />
                Google
              </span>
              <span name="facebook" id="facebook" onClick={this.handleSocialSignin}>
                <i className="fab fa-facebook fa-lg" style={{ color: 'blue' }} onClick={this.handleSocialSignin} name="facebook" />
                Facebook
              </span>
            </div>
          </div>
          <div className="switch-context">
            <div>
              No account?
              {' '}
              <p id="sc-sn" onClick={() => showSignUpModal('signup')}>
                Sign up
              </p>
            </div>
          </div>
          <div className="forgot-password">
            <Button
              datatest="request-passwordBtn"
              label="Forgot Password?"
              handleClick={() => requestPassword('passwordModal')}
              type="button"
              className="fg-ps"
              style={{
                backgroundColor: '#fff',
                color: '#8075e6',
                borderRadius: '0',
                cursor: 'pointer',
                fontSize: '12px',
                padding: '0px',
                margin: '0px',
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

SignIn.propTypes = {
  ui: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    modal: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  requestPassword: PropTypes.func.isRequired,
  signinViaSocial: PropTypes.func.isRequired,
  showSignUpModal: PropTypes.func.isRequired,
};

export default connectComponent(
  withRouter(SignIn), {
    close: closeModal,
    signIn: logIn,
    requestPassword: openModal,
    signinViaSocial: loginViaSocial,
    showSignUpModal: openModal,
  },
);
