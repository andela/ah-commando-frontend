import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Modal from '@Components/Modal';
import Input from '@Components/Input';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import { closeModal } from '@Actions/uiActions';
import { logIn } from '@Actions/authActions';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    const { logIn, history } = this.props;
    const userData = this.state;

    logIn(userData, history);
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    const {
      ui: {
        loading,
        modalOpen,
        modal,
      },
      close,
    } = this.props;

    const loader = <Loader type="ThreeDots" color="#888888" height={50} width={100} />;
    return (
      <Modal close={close} open={modalOpen && modal === 'signin'}>
        <div className="form">
          <h3 className="form-header">Sign in</h3>
          <form>
            <Input
              name="email"
              value={email}
              type="email"
              handleChange={this.handleChange}
              placeholder="john.doe@foo.bar"
              label="Email"
            />
            <Input
              name="password"
              value={password}
              type="password"
              handleChange={this.handleChange}
              placeholder="**********"
              label="Password"
            />
            <Button
              label={loading ? loader : 'SIGN IN'}
              handleClick={this.handleSubmit}
              disabled={loading}
              type="submit"
            />
          </form>
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
  logIn: PropTypes.func.isRequired,
};

export default connectComponent(
  withRouter(SignIn), {
    close: closeModal,
    logIn,
  },
);
