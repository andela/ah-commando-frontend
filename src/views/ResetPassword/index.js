import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '@Components/Input';
import Button from '@Components/Button';
import './ResetPassword.scss';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    }

    render() {
      const { password } = this.state;

      return (
        <>
          <Link to="/">Click to go Home</Link>
          <div className="passwordReset">
            <div className="form">
              <h3>Set New Password</h3>
              <form>
                <Input label="Password" type="password" name="password" placeholder="***********" value={password} handleChange={this.handleChange} />
                <Input label="Confirm" type="password" name="password" placeholder="***********" value={password} handleChange={this.handleChange} />
                <Button label="Change Passsword" type="submit" />
              </form>
            </div>
          </div>
        </>
      );
    }
}

export default ResetPassword;
