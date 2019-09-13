import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from '@Components/Icon';
import { thousandths } from '@Utils/';
import './Comment.scss';

const Comment = (props) => {
  const {
    avatar, author, alt, body, createdAt, likesCount, dislikesCount,
  } = props;

  const likes = thousandths(likesCount);
  const dislikes = thousandths(dislikesCount);
  return (
    <div className="comment-container">
      <div className="comment-author-info">
        <img className="comment-author-img" src={avatar} alt={alt} />
        <div className="comment-p">
          <p className="comment-author">{author}</p>
          <p className="comment-date">{moment(createdAt).format('MMM DD')}</p>
          <p className="comment-body">{body}</p>
        </div>
      </div>
      <div className="icons">
        <div className="singleIcon">
          <Icon name="likes" className="like" />
          <label className="icon-label">{likes}</label>
        </div>
        <div className="singleIcon">
          <Icon name="dislikes" className="dislike" />
          <label className="icon-label">{dislikes}</label>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  dislikesCount: PropTypes.number.isRequired,
};

Comment.defaultProps = {
  avatar: 'https://via.placeholder.com/50',
};

export default Comment;
