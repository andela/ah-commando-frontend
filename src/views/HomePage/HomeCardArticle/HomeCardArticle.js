import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-skeleton-loader';
import connect from '@Lib/connect-component';
import Icon from '@Components/Icon';
import { thousandths } from '@Utils/';
import './homeCardArticle.scss';

export class HomePageArticles extends Component {
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
    const { homePageArticles: { featuredArticle } } = this.props;

    if (!featuredArticle.title) {
      return (
        <div data-test="loadingComponent">
          {''}
        </div>
      );
    }

    const {
      image, title, author, description, likesCount, dislikesCount, comment, readTime,
    } = featuredArticle;

    const { firstname, lastname } = author;

    const likes = thousandths(likesCount);
    const dislikes = thousandths(dislikesCount);
    const comments = thousandths(comment.length);

    const { loading, error } = this.state;


    return (
      <article className="homepageArticle" data-test="homearticleComponent">
        <div className="img">
          {loading === 0 ? <Skeleton width="100%" height="100%" /> : ''}
          <img
            test="imgtest"
            alt=""
            src={error
              ? 'https://res.cloudinary.com/drdje1skj/image/upload/v1567527717/placeholder-image4_s2xbim.jpg'
              : image}
            onLoad={this.handleLoad}
            style={{ opacity: loading }}
            onError={this.handleError}
          />
        </div>
        <div className="articleInfo">
          <div className="container">
            <h2>{title}</h2>
            <div className="userDetails">
              <img
                data-test="autorImage"
                src={author.image ? author.image : 'https://res.cloudinary.com/drdje1skj/image/upload/v1567427029/profile-placeholder_gvxkia.gif'}
                alt="user profile"
              />
              <p className="author-name">{`${firstname} ${lastname}`}</p>
            </div>
            <p className="description">{description}</p>
            <div className="icons">
              <div className="icon-holder">
                <div>
                  <Icon name="likes" />
                  <p className="icon-label">{likes}</p>
                </div>
                <div>
                  <Icon name="dislikes" />
                  <p className="icon-label">{dislikes}</p>
                </div>
              </div>
              <div className="icon-holder">
                <div>
                  <Icon name="comments" />
                  <p className="icon-label">{comments}</p>
                </div>
              </div>
            </div>
            <p className="readTime">{`${readTime} min read`}</p>
          </div>
        </div>
      </article>
    );
  }
}

HomePageArticles.propTypes = {
  homePageArticles: PropTypes.shape({
    featuredArticle:
      PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        likesCount: PropTypes.number,
        dislikesCount: PropTypes.number,
        comment: PropTypes.any,
        readTime: PropTypes.number,
        author: PropTypes.shape({
          firstname: PropTypes.string,
          lastname: PropTypes.string,
          image: PropTypes.string,
        }),
      }),
  }).isRequired,
};

export default connect(HomePageArticles);
