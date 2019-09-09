/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import connectComponent from '@Lib/connect-component';
import PropTypes from 'prop-types';
import { setNewPassword } from '@Actions/authActions';
import Input from '@Components/Input';
import Button from '@Components/Button';
import { validate, passwordSchema } from '@Utils/';
import './ResetPassword.scss';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);

    this.state = {
      password: '',
      token: urlParams.get('token'),
      id: urlParams.get('id'),
      showPassword: false,
      showConfirm: false,
      confirmPassword: '',
      error: {},
    };
  }


  togglePassword = (passwordField) => {
    this.setState(previousState => ({
      [passwordField]: !previousState[passwordField],
    }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { password, error } = this.state;

    if (name !== 'confirmPassword') {
      const [errorMsg] = validate({ [name]: value }, passwordSchema);
      if (errorMsg) {
        error[name] = errorMsg;
      } else {
        error[name] = '';
      }
    } else {
      error[name] = this.confirmPassword(password, value);
    }

    this.setState({
      [name]: value,
      error,
    });
  }

  validatePassword = () => {
    const { password } = this.state;
    const errorMsg = validate({ password }, passwordSchema);

    if (!errorMsg.length) return '';

    return errorMsg;
  }

  confirmPassword = (a, b) => (a === b ? '' : 'Passwords do not match')

  handleSubmit = async (e) => {
    e.preventDefault();
    const { token, id, password } = this.state;
    const { passwordReset, history } = this.props;


    const errorMsg = this.validatePassword();
    this.setState({ error: { password: errorMsg } });

    if (errorMsg) return null;

    passwordReset({ password, id, token }, history);
  }

  render() {
    const {
      password, showPassword, confirmPassword, error, showConfirm,
    } = this.state;

    const {
      ui: {
        loading,
      },
    } = this.props;

    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;

    return (
      <>
        <Link to="/">Click to go Home</Link>
        <div className="passwordReset">
          <div className="form">
            <h3>Set New Password</h3>
            <form>
              <div className="form-div-elememts">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="***********"
                  value={password}
                  handleChange={this.handleChange}
                  togglable
                  visible={showPassword}
                  handleToggle={() => this.togglePassword('showPassword')}
                  error={error.password}
                />
                <Input
                  label="Confirm"
                  type="password"
                  name="confirmPassword"
                  placeholder="***********"
                  value={confirmPassword}
                  handleChange={this.handleChange}
                  togglable
                  visible={showConfirm}
                  handleToggle={() => this.togglePassword('showConfirm')}
                  error={error.confirmPassword}
                />
                <Button
                  label={loading ? null : 'Change passsword'}
                  type="submit"
                  handleClick={this.handleSubmit}
                  style={{
                    height: '45px',
                    width: '300px',
                    color: '#ffc700',
                    backgroundColor: '#000',
                    borderRadius: '0',
                  }}
                  disabled={loading ? true : Boolean(this.validatePassword())}
                >
                  {loading && loader}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

ResetPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  passwordReset: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connectComponent(
  withRouter(ResetPassword), {
    passwordReset: setNewPassword,
  },
);
