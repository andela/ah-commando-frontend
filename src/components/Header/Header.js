import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@Components/Button';
import AuthStore from '@Lib/AuthStore';
import Icon from '@Components/Icon';
import { Search } from '@Components/Input';
import './Header.scss';

// import { categories } from '../../category.json';

export const Header = () => (
  <header>
    <div>
      <div className="header-top">
        <div className="logo">Authors haven</div>
        <div className="search"><Search /></div>
        {AuthStore.getToken()
          ? (
            <div className="action">
              <Button handleClick={() => {}}>
                <Icon name="notification" />
              </Button>
              <Button handleClick={() => {}}>Upgrade</Button>
            </div>
          )
          : (
            <div className="action">
              <Button handleClick={() => {}}>signin</Button>
              <Button handleClick={() => {}}>signup</Button>
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

export default Header;
