/* eslint-disable camelcase */
/* eslint-disable no-unneeded-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import connect from '@Lib/connect-component';
import Icon from '@Components/Icon';
import { likeDislikeAResource, getLikedAResource } from '@Actions/likeActions';
import { thousandths, activateLikeAction, activateDislikeAction } from '@Utils/';
import './homeCardArticle.scss';

export class HomePageArticles extends Component {
  state = {
    loading: 0,
    error: false,
    likeAction: null,
    lc: 0,
    dlc: 0,
    hasLiked: false,
  }

  componentDidMount() {
    this.handleLikesandDislikesManualCountUpdate();
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

  async handleUserLikesForStyleUpdate(id) {
    const { getLikedAResource } = this.props;
    const likes = await getLikedAResource(id, 'article');
    if (typeof likes === 'string'
      || likes === 'not_liked'
      || likes === 'not_logged_in') {
      this.setState(prevState => ({
        ...prevState,
        hasLiked: false,
        likeAction: null,
      }));
      return false;
    }
    if (likes) {
      this.setState(prevState => ({
        ...prevState,
        likeAction: 'like',
        hasLiked: true,
      }));
    }
    if (!likes) {
      this.setState(prevState => ({
        ...prevState,
        likeAction: 'dislike',
        hasLiked: true,
      }));
    }
  }

  async handleLikesandDislikesManualCountUpdate() {
    const { homePageArticles: { featuredArticle } } = this.props;
    const { likesCount, dislikesCount, id } = featuredArticle;
    this.setState(prevState => ({
      ...prevState,
      lc: likesCount,
      dlc: dislikesCount,
    }));
    if (!id) return false;
    await this.handleUserLikesForStyleUpdate(id);
  }

  checkLikeAction(action) {
    if (action === 'like') {
      const { likeAction } = this.state;
      this.setState({
        likeAction: likeAction === 'like' ? null : 'like',
      });
    }
    if (action === 'dislike') {
      const { likeAction } = this.state;
      this.setState({
        likeAction: likeAction === 'dislike' ? null : 'dislike',
      });
    }
  }


  async likeOrDislike(e, id) {
    e.stopPropagation();
    const { likeDislikeAResource } = this.props;
    const action = e.currentTarget.attributes[1].value;
    this.checkLikeAction(action);
    const type = 'article';
    const data = await likeDislikeAResource(action, id, type);
    if (!data) {
      this.setState(prevState => ({
        ...prevState,
      }));
      return false;
    }
    const setState = this.setState.bind(this);
    if (action === 'like') {
      activateLikeAction(setState, this.state, data);
    }
    if (action === 'dislike') {
      activateDislikeAction(setState, this.state, data);
    }
  }

  generateNameByLikeAction() {
    const { likeAction } = this.state;
    if (!likeAction) return 'likes';
    if (likeAction === 'like') {
      return 'boldLikes';
    }
    return 'likes';
  }

  generateNameByDisLikeAction() {
    const { likeAction } = this.state;
    if (!likeAction) return 'dislikes';
    if (likeAction === 'dislike') {
      return 'boldDislikes';
    }
    return 'dislikes';
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
      id, image, title, author, description, comment, readTime, slug,
    } = featuredArticle;

    const { firstname, lastname } = author;

    const comments = thousandths(comment.length);

    const {
      loading, error, lc, dlc,
    } = this.state;

    return (
      <article className="homepageArticle" data-test="homearticleComponent">
        <Link
          to={`/articles/${slug}`}
          className="img"
        >
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
        </Link>
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
                <div className="like" onClick={(e) => this.likeOrDislike(e, id)} name="like">
                  <Icon name={this.generateNameByLikeAction()} className="like" />
                  <p className="icon-label">{thousandths(lc)}</p>
                </div>
                <div className="dislike" onClick={(e) => this.likeOrDislike(e, id)} name="dislike">
                  <Icon name={this.generateNameByDisLikeAction()} className="dislike" />
                  <p className="icon-label">{thousandths(dlc)}</p>
                </div>
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
        id: PropTypes.number,
        slug: PropTypes.string,
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
  likeDislikeAResource: PropTypes.func.isRequired,
  getLikedAResource: PropTypes.func.isRequired,
};

export default connect(HomePageArticles, {
  likeDislikeAResource,
  getLikedAResource,
});
