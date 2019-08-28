import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss';

const Comment = (props) => {
  const {
    name,
    date,
    image,
    comment,
  } = props;
  return (
    <div className="comment-div">
      <div className="comment-image-div">
        <img className="comment-owner-img" src={image} alt="" />
      </div>
      <div className="comment-content">
        <p className="comment-owner">{name}</p>
        <p className="comment-date"><b>{date}</b></p>
        <p className="comment-message">{comment}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;
