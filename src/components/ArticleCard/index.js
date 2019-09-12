/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import './ArticleCard.scss';
import { likeDislikeAResource, getLikedAResource } from '@Actions/likeActions';
import connect from '@Lib/connect-component';
import { thousandths } from '@Utils/';
import Icon from '../Icon';

class ArticleCard extends Component {
  state = {
    loading: 0,
    error: false,
    likeAction: null,
    lc: 0,
    dlc: 0,
    hasLiked: false,
  }

  async componentDidMount() {
    await this.handleLikesandDislikesManualCountUpdate();
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
    if (likes === 'not_liked') {
      this.setState({
        likeAction: null,
      });
    }
    if (likes) {
      this.setState({
        likeAction: 'like',
      });
    } else {
      this.setState({
        likeAction: 'dislike',
      });
    }
  }

  async handleLikesandDislikesManualCountUpdate() {
    const { data } = this.props;
    const { likesCount, dislikesCount, id } = data;
    this.setState({
      lc: likesCount,
      dlc: dislikesCount,
    });
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
      this.setState({
        likeAction: null,
      });
      return false;
    }
    const { likes, dislikes } = data;
    const { hasLiked, likeAction } = this.state;
    if (action === 'dislike' && !hasLiked && dislikes > 0) {
      this.setState(prevState => ({
        dlc: prevState.dlc + 1,
        hasLiked: true,
      }));
    } else if (action === 'dislike' && hasLiked && dislikes < 1) {
      this.setState(prevState => ({
        dlc: prevState.dlc - 1,
        hasLiked: false,
      }));
    } else if (action === 'dislike' && hasLiked && dislikes > 0) {
      this.setState(prevState => ({
        lc: prevState.lc - 1,
        dlc: prevState.dlc + 1,
        hasLiked: true,
      }));
    } else if (action === 'like' && !hasLiked && likes > 0) {
      this.setState(prevState => ({
        lc: prevState.lc + 1,
        hasLiked: true,
      }));
    } else if (action === 'like' && hasLiked && likes < 1) {
      this.setState(prevState => ({
        lc: prevState.lc - 1,
        hasLiked: false,
      }));
    } else if (action === 'like' && hasLiked && likes > 0) {
      this.setState(prevState => ({
        dlc: prevState.dlc - 1,
        lc: prevState.lc + 1,
        hasLiked: true,
      }));
    } else if (action === 'like' && !likeAction) {
      this.setState(prevState => ({
        lc: prevState.lc - 1,
        hasLiked: false,
      }));
    } else if (action === 'dislike' && !likeAction) {
      this.setState(prevState => ({
        dlc: prevState.dlc - 1,
        hasLiked: false,
      }));
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
    const { type, data } = this.props;

    if (!data) {
      return (
        <div data-test="loadingComponent">
          ...loading
        </div>
      );
    }

    const {
      image, title, author, description, comment, readTime, id,
    } = data;

    const { firstname, lastname } = author;
    const comments = thousandths(comment.length);
    const {
      loading, error, lc, dlc,
    } = this.state;
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
            <div className="like" onClick={(e) => this.likeOrDislike(e, id)} name="like">
              <Icon name={this.generateNameByLikeAction()} className="like" style={{ color: 'black' }} />
              <label className="icon-label">{thousandths(lc)}</label>
            </div>
            <div className="dislike" onClick={(e) => this.likeOrDislike(e, id)} name="dislike">
              <Icon name={this.generateNameByDisLikeAction()} className="dislike" style={{ color: 'black' }} />
              <label className="icon-label">{thousandths(dlc)}</label>
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
    id: PropTypes.number,
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
  likeDislikeAResource: PropTypes.func.isRequired,
  getLikedAResource: PropTypes.func.isRequired,
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
<<<<<<< HEAD
    slug: '',
=======
    id: 0,
>>>>>>> Finish first implementation to like
  },
};

export default connect(ArticleCard, {
  likeDislikeAResource,
  getLikedAResource,
});
