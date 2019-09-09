import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Input from '@Components/Input';
import Button from '@Components/Button';
import Modal from '@Components/Modal';
import connectComponent from '@Lib/connect-component';
import PropTypes from 'prop-types';
import { requestPasswordLink } from '@Actions/authActions';
import { closeModal } from '@Actions/uiActions';
import { validate, emailSchema } from '@Utils/';


export class PasswordRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: {},
    };
  }


  handleChange = (e) => {
    const { name, value } = e.target;

    const { error } = this.state;

    const [errorClone] = validate({ email: value }, emailSchema);
    if (errorClone) {
      error[name] = errorClone;
    } else {
      error[e.target.name] = '';
    }

    this.setState({ email: value, error });
  }


  validate = () => {
    const { email } = this.state;
    const errorClone = validate({ email }, emailSchema);

    if (!errorClone.length) return '';

    return errorClone[0];
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { requestLink } = this.props;

    const errMsg = this.validate();
    this.setState({ error: { email: errMsg } });

    if (errMsg) return null;

    return requestLink(email);
  }

  closeModal = () => {
    const { close } = this.props;
    this.setState({
      email: '',
    });
    close();
  }

  render() {
    const { email, error } = this.state;
    const {
      ui: {
        modalOpen,
        modal,
        loading,
      },
    } = this.props;

    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;

    return (
      <Modal open={modalOpen && modal === 'passwordModal'} close={this.closeModal}>
        <div className="form">
          <h3>Password Reset</h3>
          <form>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={email}
              handleChange={this.handleChange}
              error={error.email}
              id="passwordEmail"
            />
            <Button
              datatest="send-password-link"
              label={loading ? null : 'Send reset link'}
              type="submit"
              handleClick={this.handleSubmit}
              style={{
                height: '45px',
                width: '300px',
                color: '#ffc700',
                backgroundColor: '#000',
                borderRadius: '0',
              }}
              disabled={loading ? true : Boolean(this.validate())}
            >
              {loading && loader}
            </Button>
          </form>
        </div>

      </Modal>
    );
  }
}

PasswordRequest.propTypes = {
  close: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    modalOpen: PropTypes.bool.isRequired,
    modal: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  requestLink: PropTypes.func.isRequired,
};
export default connectComponent((PasswordRequest), {
  close: closeModal,
  requestLink: requestPasswordLink,
});
