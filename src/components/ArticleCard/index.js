/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { PropTypes } from 'prop-types';
import './ArticleCard.scss';
import Icon from '../Icon';

const ArticleCard = (props) => {
  const { type, data } = props;
  return (
    <div className={`${type}`}>
      <div className="image-container">
        <img className="img" alt="logo" src={data.image} />
      </div>
      <div className="article-details">
        <div className="title-container">
          <label className="title">{data.title}</label>
          <label className="author-name">{data.authorName}</label>
          <label className="description">{data.description}</label>
        </div>
        <div className="icons">
          <div className="like">
            <Icon name="likes" className="like" />
            <label className="icon-label">{data.likes}</label>
          </div>
          <div className="dislike">
            <Icon name="dislikes" />
            <label className="icon-label">{data.dislikes}</label>
          </div>
          <div className="comment">
            <Icon name="comments" />
            <label className="icon-label">{data.comments}</label>
          </div>
          <label className="hor-readTime">{`${data.readTime} min read`}</label>
        </div>
        <label className="ver-readTime">{`${data.readTime} min read`}</label>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    authorName: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.number,
    dislikes: PropTypes.number,
    comments: PropTypes.number,
    readTime: PropTypes.number,
  }),
};

ArticleCard.defaultProps = {
  type: '',
  data: {
    image: '',
    title: '',
    authorName: '',
    description: '',
    likes: 2,
    dislikes: 1,
    comments: 1,
    readTime: 1,
  },
};

export default ArticleCard;
