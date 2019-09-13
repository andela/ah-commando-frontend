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
import { getProfile } from '@Actions/profileAction';
import back from '../../../public/Rectangle.png';
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
          <p>All done no More Notifications</p>
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
          <h3>{`New ${notification.resourceType}`}</h3>
          <div className="content">
            <p className="description">
              {notification.message}
            </p>
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
          <Link to="/profile" className="dropLinks">Profile</Link>
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
          <Link to="/" className="dropLinks">Logout</Link>
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

  render() {
    const {
      type, notifications: { notifications }, show, profile: { user },
    } = this.props;

    const height = type !== 'notification' ? '400px' : '500px';
    const width = type !== 'notification' ? '270px' : '335px';

    return (
      <section
        style={show ? (type === 'notification'
          ? { right: '72%', transform: 'scaleY(1)' } : { right: '9%', transform: 'scaleY(1)' }) : { display: 'none' }}
        className="dropdownSection"
        data-test="dropDownComponent"
      >
        <section className="dropDown" style={{ height }}>
          <img className="backDrop" style={{ width }} src={back} alt="" />
          <div className="dropDowncontainer" style={{ width }}>
            {type === 'notification' ? (
              <header className="header">
                <h3>NOTIFICATIONS</h3>
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
};

DropDown.defaultProps = {
  type: 'notifications',
};

export default connectComponent(withRouter(DropDown),
  {
    markAsRead, getNotifications, markAllRead, updateSubscription, getProfile,
  });
