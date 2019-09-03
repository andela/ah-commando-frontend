import React, { Component } from 'react';
import Input from '@Components/Input';
import Button from '@Components/Button';
import Modal from '@Components/Modal';
import connectComponent from '@Lib/connect-component';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/uiAction';


export class PasswordRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  closeModal = () => {
    const { close } = this.props;
    close();
  }

  componentDidMount = () => {
    console.log(this.props);
  }

  render() {
    const { email } = this.state;
    const {
      ui: {
        modalOpen,
        modal,
      },
    } = this.props;
    return (
      <Modal open={modalOpen && modal === 'passwordModal'} close={this.closeModal}>
        <div className="form">
          <h3>Password Reset</h3>
          <form>
            <Input label="Email" type="email" name="email" placeholder="Input youur Email" value={email} handleChange={this.handleChange} />
            <Button label="Send Reset Link" type="submit" />
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
  }).isRequired,
};
export default connectComponent(PasswordRequest, {
  close: closeModal,
});
