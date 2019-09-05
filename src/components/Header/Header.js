import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@Components/Button';
import AuthStore from '@Lib/AuthStore';
import Icon from '@Components/Icon';
import { Search } from '@Components/Input';
import { openModal } from '@Actions/uiActions';
import './Header.scss';
import connectComponent from '@App/lib/connect-component';

export const Header = (props) => {
  const { signIn, signUp } = props;
  return (
    <header>
      <div>
        <div className="header-top">
          <div className="logo">Authors haven</div>
          <div className="search"><Search /></div>
          {AuthStore.getToken()
            ? (
              <div className="action">
                <Button handleClick={() => { }}>
                  <Icon name="notification" />
                </Button>
                <Button handleClick={() => { }}>Upgrade</Button>
              </div>
            )
            : (
              <div className="action">
                <Button
                  label="sign in"
                  handleClick={signIn}
                  disabled={false}
                  type="button"
                />
                <Button
                  data-test="signup-button"
                  label="sign up"
                  handleClick={signUp}
                  disabled={false}
                  type="button"
                />
              </div>
            )}
        </div>
        <div className="navigation">
          <ul>
            <li>
              <Link to="/a">Technology</Link>
            </li>
            <li>
              <Link to="/a">Health</Link>
            </li>
            <li>Culture</li>
            <li>Science</li>
            <li>Fashion</li>
            <li>Education</li>
            <li>Lifestyle</li>
            <li>Nature</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connectComponent(Header, {
  signIn: () => openModal('signin'),
  signUp: () => openModal('signup'),
});
