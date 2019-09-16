/* eslint-disable react/prop-types */
/* eslint-disable no-new */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import Button from '@Components/Button';
import AuthStore from '@Lib/AuthStore';
import Icon from '@Components/Icon';
import connectComponent from '@App/lib/connect-component';
import { openModal } from '@Actions/uiActions';
import { updateSearchQuery, getFilteredArticles, updatePageNumber } from '@Actions/searchActions';
import { getNotifications } from '@Actions/notifications';
import { getProfile } from '@Actions/profileAction';
import DropDown from '../DropDown';
import logo from '../../../public/logo.png';
import './Header.scss';

const buttonStyle = {
  width: '100px',
  height: '35px',
};

export class Header extends Component {
  state = {
    search: false,
    searchContent: '',
    showDropDown: false,
    type: '',
    prevType: '',
    currentLocation: '',
    showDot: false,
  }

  componentDidMount() {
    this.state.currentLocation = this.props.history.location;
    this.pusher = new Pusher('5348b046f75caaacd965', { cluster: 'eu' });
    this.channel = this.pusher.subscribe('push-notifications');
  }

  componentDidUpdate(prevProps) {
    const { history: { location }, auth: { isAuthenticated, user: { username } } } = this.props;
    const { currentLocation } = this.state;
    if (prevProps.auth.isAuthenticated !== isAuthenticated) {
      this.props.getNotifications();
      this.props.getProfile();
      this.channel.bind(`notify-${username}`, (data) => {
        this.props.getNotifications();
        Notification.requestPermission();
        new Notification(data.message);
      });
    }

    if (currentLocation !== location) {
      this.setState({
        showDropDown: false, currentLocation: location,
      });
    }

    const { notifications: { notifications } } = this.props;
    if (prevProps.notifications.notifications.length !== notifications.length) {
      const show = (notifications.length > 0);
      this.setState({
        showDot: show,
      });
    }
  }

  openSearch = () => {
    this.setState((prevState) => ({ search: !prevState.search, searchContent: '' }));
  };

  handleInputChange = (e) => {
    this.setState({
      searchContent: e.target.value,
    });
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length && e.target.value.length > 1) {
        this.props.updateSearchQuery(e.target.value);
        this.props.getFilteredArticles(e.target.value);
        this.props.updatePageNumber(1);
        this.props.history.push('/search');
      }
    }
  };

  handleBlur = () => {
    if (this.state.searchContent !== '') return;
    this.setState({
      search: false,
    });
  }

  handleDrop = (type) => {
    const { prevType } = this.state;
    if (prevType === type) {
      this.setState((prevState) => ({
        showDropDown: !prevState.showDropDown, type, prevType: type,
      }));
    } else {
      this.setState(() => ({
        type,
        prevType: type,
        showDropDown: true,
      }));
    }
  }

  render() {
    const {
      search, searchContent, type, showDropDown, showDot,
    } = this.state;
    const {
      signIn, signUp, history, profile: { user },
    } = this.props;
    if (user) { this.userImg = user.image; }

    return (
      <>
        <header className="header-top" data-test="headerComponent">
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
          <div className="search">
            <div>
              <div>
                {search ? (
                  <input
                    type="text"
                    autoFocus={search}
                    onKeyUp={(e) => { this.handleKeyUp(e); }}
                    datatest="input-search"
                    placeholder="Search..."
                    onBlur={this.handleBlur}
                    onChange={this.handleInputChange}
                    value={searchContent}
                  />
                ) : ''}
              </div>
              <button
                type="button"
                className="searchButton"
                onClick={this.openSearch}
                datatest="search-icon"
              >
                <Icon name="search" style={{ color: 'inherit' }} />
              </button>
            </div>
            <span style={search ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }}>{' '}</span>
          </div>
          {AuthStore.getToken()
            ? (
              <div className="action">
                <button
                  className="notification"
                  type="button"
                  datatest="notifyButton"
                  onClick={() => this.handleDrop('notification')}
                  style={buttonStyle}
                >
                  {showDot ? <div className="showDot">{' '}</div> : ''}
                  <Icon name="notification" />
                </button>
                <DropDown type={type} show={showDropDown} />
                <Button style={buttonStyle} handleClick={this.handleClick}>Upgrade</Button>
                <button
                  className="notification"
                  type="button"
                  onClick={() => this.handleDrop('')}
                  datatest="profileButton"
                >
                  <img
                    data-test="userImage"
                    src={this.userImg ? this.userImg : 'https://res.cloudinary.com/drdje1skj/image/upload/v1567427029/profile-placeholder_gvxkia.gif'}
                    alt="profile"
                    style={{
                      height: '45px',
                      width: '45px',
                      borderRadius: '50%',
                      margin: '0 50px',
                      objectFit: 'cover',
                    }}
                  />
                </button>

              </div>
            )
            : (
              <div className="action">
                <Button
                  label="sign in"
                  handleClick={() => signIn('signin')}
                  disabled={false}
                  type="button"
                  style={buttonStyle}
                  id="signin"
                  datatest="signin-button"
                />
                <Button
                  datatest="signup-button"
                  label="sign up"
                  handleClick={() => signUp('signup')}
                  disabled={false}
                  type="button"
                  style={buttonStyle}
                  id="signup"
                />
              </div>
            )}
        </header>
        {history.location.pathname === '/' ? (
          <div className="navigation" data-test="navigationComponent">
            <ul>
              <Link to="/articles?category=technology">Technology</Link>
              <Link to="/articles?category=health">Health</Link>
              <Link to="/articles?category=culture">Culture</Link>
              <Link to="/articles?category=science">Science</Link>
              <Link to="/articles?category=fashion">Fashion</Link>
              <Link to="/articles?category=education">Education</Link>
              <Link to="/articles?category=lifestyle">Lifestyle</Link>
              <Link to="/articles?category=nature">Nature</Link>
            </ul>
          </div>
        ) : null}
      </>
    );
  }
}

Header.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
  getFilteredArticles: PropTypes.func.isRequired,
  updatePageNumber: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      image: PropTypes.string,
    }),
  }).isRequired,
  notifications: PropTypes.shape({
    notifications: PropTypes.array,
  }).isRequired,
};

export default connectComponent(withRouter(Header), {
  signIn: openModal,
  signUp: openModal,
  updateSearchQuery,
  getFilteredArticles,
  updatePageNumber,
  getNotifications,
  getProfile,
});
