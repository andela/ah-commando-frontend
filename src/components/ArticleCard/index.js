import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import './ArticleCard.scss';
import { thousandths } from '@Utils/';
import Icon from '../Icon';

class ArticleCard extends Component {
  state = {
    loading: 0,
    error: false,
  }

  handleLoad = () => {
    this.setState({
      loading: 1,
    });
  }

  handleError = () => {
    this.setState({
      error: true,
      loading: 1,
    });
  }


  render() {
    const { type, data } = this.props;

    if (!data) {
      return (
        <div data-test="loadingComponent">
          ...loading
        </div>
      );
    }

    const {
      image, title, author, description, likesCount, dislikesCount, comment, readTime, slug,
    } = data;

    const { firstname, lastname } = author;
    const likes = thousandths(likesCount);
    const dislikes = thousandths(dislikesCount);
    const comments = thousandths(comment.length);
    const { loading, error } = this.state;
    return (
      <div className={`${type}`}>
        <Link to={`/articles/${slug}`}>
          <div className="image-container">
            {loading === 0 ? <Skeleton width="100%" height="100%" /> : ''}
            <img
              className="img"
              alt=""
              src={error
                ? 'https://res.cloudinary.com/drdje1skj/image/upload/v1567527717/placeholder-image4_s2xbim.jpg'
                : image}
              onLoad={this.handleLoad}
              style={{ opacity: loading }}
              onError={this.handleError}
            />
          </div>
        </Link>
        <div className="article-details">
          <div className="title-container">
            <p className="title">{title}</p>
            <label className="author-name">{`${firstname} ${lastname}`}</label>
            <label className="description">{description}</label>
          </div>
          <div className="icons">
            <div className="like">
              <Icon name="likes" className="like" />
              <label className="icon-label">{likes}</label>
            </div>
            <div className="dislike">
              <Icon name="dislikes" />
              <label className="icon-label">{dislikes}</label>
            </div>
            <div className="comment">
              <Icon name="comments" />
              <label className="icon-label">{comments}</label>
            </div>
            <label className="hor-readTime">{`${readTime} min read`}</label>
          </div>
          <label className="ver-readTime">{`${readTime} min read`}</label>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    authorName: PropTypes.string,
    description: PropTypes.string,
    likesCount: PropTypes.number,
    dislikesCount: PropTypes.number,
    comment: PropTypes.any,
    readTime: PropTypes.number,
    slug: PropTypes.string,
    author: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }),
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
    comment: 1,
    readTime: 1,
    slug: '',
  },
};

export default ArticleCard;
