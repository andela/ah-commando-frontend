/* eslint-disable no-nested-ternary */
import React from 'react';
import Button from '../Button';
import './RenderButton.scss';

const renderButton = (props) => {
  const {
    profile: { username },
    userToken,
    isFollowing,
    handleToggleEditProfileModal,
    handleUnFollowUser,
    handleFollowUser,
  } = props;
  const button = (username === userToken) ? (
    <Button
      handleClick={() => handleToggleEditProfileModal('open')}
      datatest="edit-button"
      style={{ padding: '0px 5px', width: '150px' }}
    >
      Edit Profile
    </Button>
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

export default renderButton;
