/* eslint-disable no-nested-ternary */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../Button';
import './RenderButton.scss';

const renderButton = (props) => {
  const {
    profile: { username },
    usernameFromToken,
    isFollowing,
    handleToggleEditProfileModal,
    handleUnFollowUser,
    handleFollowUser,
  } = props;
  const button = (username === usernameFromToken) ? (props.match.url === '/me' || props.match.url === `profiles/${usernameFromToken}`) ? (
    <Button
      handleClick={() => handleToggleEditProfileModal('open')}
      datatest="edit-button"
      style={{ padding: '0px 5px', width: '150px' }}
    >
    Edit Profile
    </Button>
  ) : (
    null
  ) : isFollowing ? (
    <Button
      handleClick={() => handleUnFollowUser()}
      datatest="edit-button"
      style={{ padding: '0px 5px', width: '150px' }}
      className="follow-btn"
    >
      <span className="unfollow">Following</span>
    </Button>
  ) : (
    <Button
      handleClick={() => handleFollowUser()}
      datatest="edit-button"
      style={{ padding: '0px 5px', width: '150px' }}
      className="unfollow-btn"
    >
      <span className="follow">Follow</span>
    </Button>
  );

  return button;
};

export default withRouter(renderButton);
