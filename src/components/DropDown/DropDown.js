/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import connectComponent from '@App/lib/connect-component';
import './DropDown.style.scss';
import {
  markAsRead, getNotifications, markAllRead, updateSubscription,
} from '@Actions/notifications';
import { logout } from '@Actions/authActions';
import { getProfile } from '@Actions/profileAction';
import checkMark from '../../../public/check-mark.png';
import { formatDate } from '@Utils/';

// eslint-disable-next-line no-unused-vars

export class DropDown extends Component {
  state = {
    emailNotify: false,
    updated: false,
  };

  componentDidMount() {
    getProfile();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.profile.user) return 1;

    const { profile: { user: { newPostEmailSub } } } = this.props;
    const { updated } = this.state;
    if (prevProps.profile.user.newPostEmailSub === newPostEmailSub && !updated) {
      this.setState({
        emailNotify: newPostEmailSub, updated: true,
      });
    }
  }

  showNotifications = (notifications) => {
    if (!notifications[0]) {
      return (
        <div className="noNotifications">
          <img src={checkMark} alt="" />
          <p>All done no more notifications</p>
        </div>
      );
    }
    return notifications.map(notification => {
      const date = formatDate(notification.createdAt);
      return (
        <button
          className="notify"
          key={notification.id}
          type="button"
          data-test="notifybutton"
          onClick={() => this.handleClick(notification.id,
            notification.resourceType, notification.resourceId)}
        >
          <div className="content">
            <div className="description-container">
              <p className="noticationDescription">
                {notification.message}
              </p>
            </div>
            <div className="date">
              <p>{`${date.day} ${date.month}`}</p>
              <p>{`${date.hours}:${date.minutes < 10 ? `0${date.minutes}` : date.minutes} ${(date.hours) < 12 ? 'AM' : 'PM'}`}</p>
            </div>
          </div>
        </button>
      );
    });
  };

  showUserProfile = (user) => {
    if (!user) return (<div>{' '}</div>);
    const { firstname, lastname } = user;
    const { emailNotify } = this.state;
    return (
      <div className="userProfileDropdown">
        <p>
          {firstname}
          {' '}
          {lastname}
        </p>
        <ul className="dropList">
          <Link to="/create-article" className="dropLinks">New Article</Link>
          <Link to="/" className="dropLinks">Bookmarks</Link>
          <Link to="/me" className="dropLinks">Profile</Link>
          <Link to="/" className="dropLinks">Stats</Link>
          <Link to="/" className="dropLinks">Help</Link>
          <div className="email">
            <p className="emailHeader">Email Notifications</p>
            <label className="label toggle">
              <input
                onChange={this.handleChange}
                data-test="checkbox"
                type="checkbox"
                className="toggle_input"
                checked={emailNotify}
              />
              <div className="toggle-control" />
            </label>
          </div>
          <div onClick={() => { this.handleSignout(); }}>
            <Link data-test="drop-down" to="/logout" className="dropLinks">Logout</Link>
          </div>
        </ul>
      </div>
    );
  };

  markAllAsRead = () => {
    const { markAllRead, getNotifications } = this.props;
    markAllRead();
    getNotifications();
  }

  handleChange = async (e) => {
    const { updateSubscription, getProfile } = this.props;
    this.setState({
      emailNotify: e.target.checked,
    });
    await updateSubscription(e.target.checked);
    getProfile();
  }

  handleClick(id, type, resourceId) {
    const { markAsRead, getNotifications, history } = this.props;
    markAsRead(id);
    getNotifications();
    switch (type) {
      case 'article':
        return history.push(`/articles/${resourceId}`);
      case 'follow':
        return history.push(`/profiles/${resourceId}`);
      default:
        return history.push(`/profiles/${resourceId}`);
    }
  }

  handleSignout() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const {
      type, notifications: { notifications }, show, profile: { user },
    } = this.props;

    const height = type !== 'notification' ? '325px' : '400px';
    const width = type !== 'notification' ? '270px' : '300px';

    let highlightStyles;
    if (type === 'notification') {
      highlightStyles = {
        icon: {
          width: '70px',
          top: '-19%',
        },
        cover: {
          width: '70px',
          top: '-7%',
        },
      };
    } else {
      highlightStyles = {
        icon: {
          width: '80px',
          top: '-23%',
        },
        cover: {
          width: '80px',
          top: '-9%',
        },
      };
    }

    return (
      <section
        style={show ? (type === 'notification'
          ? { right: '77%', transform: 'scaleY(1)' } : { right: '9%', transform: 'scaleY(1)' }) : { display: 'none' }}
        className="dropdownSection"
        data-test="dropDownComponent"
      >
        <section className="dropDown" style={{ height }}>
          <div className="highlightIcon" style={highlightStyles.icon}>{' '}</div>
          <div className="highlightCover" style={highlightStyles.cover}>{' '}</div>
          <div className="dropDowncontainer" style={{ width }}>
            {type === 'notification' ? (
              <header className="header">
                <h3>Notifications</h3>
                {notifications[0]
                  ? (
                    <button type="button" onClick={this.markAllAsRead} btn-test="markAllRead">
                      <p>mark all</p>
                    </button>
                  ) : ''}
              </header>
            ) : ''}
            <div className="dropDowncontent">
              {type === 'notification'
                ? this.showNotifications(notifications)
                : this.showUserProfile(user)}
            </div>
          </div>
        </section>
      </section>
    );
  }
}

DropDown.propTypes = {
  markAsRead: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  markAllRead: PropTypes.func.isRequired,
  updateSubscription: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      newPostEmailSub: PropTypes.bool,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  type: PropTypes.string,
  show: PropTypes.bool.isRequired,
  notifications: PropTypes.shape({
    notifications: PropTypes.array,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  type: 'notifications',
};

export default connectComponent(withRouter(DropDown),
  {
    markAsRead, getNotifications, markAllRead, updateSubscription, getProfile, logout,
  });
