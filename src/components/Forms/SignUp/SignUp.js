import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Modal from '@Components/Modal';
import Input from '@Components/Input';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import { closeModal } from '@Actions/uiActions';
import { createUser } from '@Actions/authActions';
// import { validate, emailSchema, passwordSchema } from '@Utils/';
import './SignUp.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // passwordConfirm: '',
      showPassword: false,
      // errors: {},
      isFormValid: true,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    // const errors = {};
    // const [errorValue] = validate({
    //   [name]: value,
    // }, name === 'password' ? passwordSchema : emailSchema);

    // errors[name] = errorValue || '';
    // this.setFormValidity(errors);
    this.setState({
      [name]: value,
      // errors,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('props ===>', this.props);
    const {
      firstName,
      lastName,
      email,
      password,
      // passwordConfirm,
      // errors,
    } = this.state;
    const { signUp, history } = this.props;
    // const formIsValid = this.validForm();

    // if (!formIsValid) {
    //   return this.setFormValidity(errors);
    // }
    signUp({
      firstName,
      lastName,
      email,
      password,
      // passwordConfirm,
      isFormValid: true,
      // errors: {},
    }, history);
  }

  // validateForm = () => {
  //   const {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     passwordConfirm,
  //     errors,
  //   } = this.state;

  //   errors.firstName = validate('firstName', firstName).firstName;
  //   errors.lastName = validate('lastName', lastName).lastName;
  //   errors.email = validate('email', email).email;
  //   errors.password = validate('password', password).password;
  //   errors.Password = validate('passwordCOnfirm', passwordConfirm).password;

  //   this.setState({ errors });
  //   return this.setFormValidity(errors);
  // }

  // setFormValidity = (errors) => {
  //   let valid = true;
  //   Object.values(errors).forEach((value) => {
  //     if (value.length > 0) {
  //       valid = false;
  //     }
  //   });
  //   this.setState({ isFormValid: valid });

  //   return valid;
  // }

  toggleVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }

  resetModal = () => {
    const { close } = this.props;
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // passwordConfirm: '',
      showPassword: false,
      // errors: {},
      isFormValid: true,
    });
    close();
  }

  render() {
    console.log('hhhhhhdd');
    const {
      firstName,
      lastName,
      email,
      password,
      // passwordConfirm,
      // showPassword,
      // errors,
      isFormValid,
    } = this.state;
    const {
      ui: {
        loading,
        modalOpen,
        modal,
      },
    } = this.props;
    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;

    return (
      <Modal close={this.resetModal} open={modalOpen && modal === 'signup'}>
        <div className="form">
          <h3 className="form-header">Join us now</h3>
          <p className="form-text">
            Create an account, follow the adventure everywhere anywhere
          </p>
          <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Input
              name="firstName"
              value={firstName}
              type="text"
              handleChange={this.handleChange}
              placeholder="John"
              label="firstname"
              // error={errors.firstName}
            />
            <Input
              name="lastName"
              value={lastName}
              type="text"
              handleChange={this.handleChange}
              placeholder="Doe"
              label="lastname"
              // error={errors.lastName}
            />
            <Input
              name="email"
              value={email}
              type="email"
              handleChange={this.handleChange}
              placeholder="john.doe@foo.bar"
              label="email"
              // error={errors.email}
            />
            <Input
              name="password"
              value={password}
              type="password"
              handleChange={this.handleChange}
              placeholder="**********"
              label="password"
              // error={errors.password}
            />
            {/* <Input
              name="passwordConfirm"
              value={passwordConfirm}
              type="password"
              handleChange={this.handleChange}
              placeholder="**********"
              label="Confirm"
              // error={errors.password}
            /> */}
            <Button
              label={loading ? null : 'create account'}
              handleClick={this.handleSubmit}
              disabled={loading ? true : !isFormValid}
              type="submit"
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
            <p>Or create ann account using:</p>
            <div className="social-login">
              <span>
                <i className="fab fa-google fa-lg" style={{ color: 'red' }} />
                Google
              </span>
              <span>
                <i className="fab fa-facebook fa-lg" style={{ color: 'blue' }} />
                Facebook
              </span>
            </div>
          </div>
          <div className="switch-context">
            <p>
              Have an account?
              {' '}
              <Link to="/">
                Sign in
              </Link>
            </p>
          </div>
          <div className="forgot-password">
            <Link to="/">
              Forgot Password?
            </Link>
          </div>
        </div>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  ui: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    modal: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connectComponent(
  withRouter(SignUp), {
    close: closeModal,
    signUp: createUser,
  },
);
