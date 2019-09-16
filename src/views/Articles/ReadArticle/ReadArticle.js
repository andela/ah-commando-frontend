/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { withRouter, Link } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import Loader from 'react-loader-spinner';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { readArticle, deleteAnArticle } from '@Actions/Articles';
import { getArticlesWithTagFromDb } from '@Actions/tagAction';
import { getProfile } from '@Actions/profileAction';
import RenderButton from '@Components/RenderButton';
import connectComponent from '@Lib/connect-component';
import Icon from '@Components/Icon';
import { followUser } from '@Actions/followActions';
import { unFollowUser } from '@Actions/unfollowActions';
import { likeDislikeAResource, getLikedAResource } from '@Actions/likeActions';
import {
  convertToHtml, isEmpty, activateLikeAction, activateDislikeAction, thousandths,
} from '@Utils/';
import './ReadArticle.scss';

const appUrl = 'https://ah-commando-react.herokuapp.com';
export class ReadArticle extends Component {
  state = {
    errors: {},
    isFormValid: true,
    dialogOpen: false,
    profile: {
      email: '',
      image: '',
      bio: '',
      firstname: '',
      lastname: '',
      followings: [],
      followerCount: '',
      followingCount: '',
    },
    usernameFromToken: '',
    username: '',
    isFollowing: false,
    likeAction: null,
    lc: 0,
    dlc: 0,
    hasLiked: false,
  }

  componentDidMount = async () => {
    const {
      getSingleArticle,
      match: {
        params: {
          slug,
        },
      },

      fetchProfile,
    } = this.props;
    const { auth: { isAuthenticated } } = this.props;
    if (isAuthenticated) {
      const { username } = jwtDecode(localStorage.getItem('haven'));
      const user = await fetchProfile();
      this.setState(prevState => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          followings: user.payload.followings,
        },
        usernameFromToken: username,
      }));
    }
    await getSingleArticle(slug);
    this.iAmFollowing();
    await this.handleLikesandDislikesManualCountUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article && prevProps.article.author) {
      if (prevProps.article.author.username !== prevState.username) {
        this.setState(prevState => ({
          ...prevState,
          username: prevProps.article.author.username,
        }));
      }
    }
  }

  iAmFollowing = () => {
    let response = false;
    const { profile: { followings }, username } = this.state;
    followings.forEach((fellow) => {
      if (fellow.username === username) {
        response = true;
      }
    });
    this.setState({
      isFollowing: response,
    });
    return response;
  }

  parseArticleBody = article => {
    if (!article) {
      return null;
    }
    try {
      return convertToHtml(JSON.parse(article));
    } catch (e) {
      return article;
    }
  }

  editArticle = () => {
    const { history, article: { slug } } = this.props;
    history.push(`/articles/${slug}/edit`);
  }

  isMyArticle = () => {
    const {
      article,
      auth: {
        isAuthenticated,
        user: {
          id,
        },
      },
    } = this.props;
    const authorId = !isEmpty(article) ? article.authorId : 0;

    return isAuthenticated && (authorId === id);
  }

  deleteArticle = () => {
    swal({
      text: 'Are you sure? Once deleted, this cannot be undone!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const { article: { slug }, history, deleteArticle } = this.props;
          deleteArticle(slug, history);
        }
      });
  }

  handleClick = name => {
    document.querySelector(`[aria-label="${name}"]`).click();
  }

  handleTagClick = async (tag) => {
    const { getArticlesTag, history } = this.props;
    await getArticlesTag(tag, history);
  }

  handleFollowUser = async () => {
    const { follow, article: { author: { username } } } = this.props;
    await follow(username);
    this.setState({
      isFollowing: true,
    });
  };

  handleUnFollowUser = async () => {
    const { unfollow, article: { author: { username } } } = this.props;
    await unfollow(username);
    this.setState({
      isFollowing: false,
    });
  };

  handleProfile = () => {
    const { article: { author: { username } } } = this.props;
    const { history } = this.props;
    return history.push(`/profiles/${username}`);
  };

  handleClick = name => {
    document.querySelector(`[aria-label="${name}"]`).click();
  }

 handleUserLikesForStyleUpdate = async (id) => {
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

  handleLikesandDislikesManualCountUpdate = async () => {
    const { article } = this.props;
    const { likesCount, dislikesCount, id } = article;
    this.setState({
      lc: likesCount,
      dlc: dislikesCount,
    });
    await this.handleUserLikesForStyleUpdate(id);
  }

  checkLikeAction = (action) => {
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

  likeOrDislike = async (e, id) => {
    e.stopPropagation();
    const { likeDislikeAResource } = this.props;
    const action = e.currentTarget.attributes[1].value;
    const type = 'article';
    const data = await likeDislikeAResource(action, id, type);
    if (!data) {
      this.setState(prevState => ({
        ...prevState,
      }));
      return false;
    }
    this.checkLikeAction(action);
    const setState = this.setState.bind(this);
    if (action === 'dislike') {
      activateDislikeAction(setState, this.state, data);
    }
    if (action === 'like') {
      activateLikeAction(setState, this.state, data);
    }
  }

  generateNameByLikeAction = () => {
    const { likeAction } = this.state;
    if (!likeAction) return 'likes';
    if (likeAction === 'like') {
      return 'boldLikes';
    }
    return 'likes';
  }

  generateNameByDisLikeAction = () => {
    const { likeAction } = this.state;
    if (!likeAction) return 'dislikes';
    if (likeAction === 'dislike') {
      return 'boldDislikes';
    }
    return 'dislikes';
  }

  render = () => {
    const {
      ui: { loading },
      article: {
        title,
        description,
        author,
        createdAt,
        readTime,
        image,
        articleBody,
        Tags,
        comment,
        id: articleId,
        slug,
        id,
      },
      history,
      auth: { isAuthenticated },
    } = this.props;

    const tags = Tags ? Tags.map((tag, i) => (
      <li className="liTag" key={i}>
        <p onClick={() => this.handleTagClick(tag.name)}>{tag.name}</p>
      </li>
    )) : null;

    const { usernameFromToken, isFollowing } = this.state;
    const {
      usernameFromToken, isFollowing, lc, dlc,
    } = this.state;
    const profile = {
      username: author && author.username,
    };

    const articleComments = () => {
      history.push(`/articles/comments/${articleId}`);
    };

    const body = this.parseArticleBody(articleBody);

    const loader = (
      <div data-test="loader" className="loader">
        <Loader
          type="ThreeDots"
          color="#ffa500"
          height={150}
          width={150}
        />
      </div>
    );

    return (
      <>
        {loading ? loader : (
          <div className="read-article">
            <div className="article-header vertical-center">
              <h1 className="title">{title}</h1>
              <p className="description">{description}</p>
              <div className="article-user center">
                <div className="article-user-details">
                  <div className="article-img-div center">
                    <img
                      src={
                        author && author.image !== null ? author.image
                          : 'https://res.cloudinary.com/drdje1skj/image/upload/v1567427029/profile-placeholder_gvxkia.gif'
                      }
                      alt="profile pic"
                    />
                  </div>
                  <div className="article-details-div center">
                    <div className="vertical-center name-date">
                      <p className="author-name">
                        <Link onClick={this.handleProfile} to="#">
                          {author ? author.username : 'Loading...'}
                        </Link>
                      </p>
                      <p className="created-date">{moment(createdAt).format('MMM DD, YYYY')}</p>
                    </div>
                    <div>
                      {usernameFromToken && (
                        <RenderButton
                          handleUnFollowUser={this.handleUnFollowUser}
                          handleFollowUser={this.handleFollowUser}
                          usernameFromToken={usernameFromToken}
                          isFollowing={isFollowing}
                          profile={profile}
                        />
                      )}
                    </div>
                    <div className="vertical-center read-time">
                      <p>{`${readTime || 0} min${readTime > 1 ? 's' : ''} read`}</p>
                      {this.isMyArticle() && (
                        <button
                          data-test="edit-article"
                          type="button"
                          onClick={this.editArticle}
                        >
                          Edit Article
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-article-image-div">
              <img
                src={image}
                alt=""
              />
            </div>
            <main className="center">
              <article>
                {ReactHtmlParser(body)}
              </article>
            </main>
            <div className="article-tag-div">
              <ul>
                {tags}
              </ul>
            </div>
            <div className="article-stats-div">
              <div className="center like-count like" onClick={(e) => this.likeOrDislike(e, id)} name="like">
                <Icon name={this.generateNameByLikeAction()} style={{ color: 'black' }} />
                <p className="icon-label">{thousandths(lc)}</p>
              </div>
              <div className="center like-count dislike" onClick={(e) => this.likeOrDislike(e, id)} name="dislike">
                <Icon name={this.generateNameByDisLikeAction()} style={{ color: 'black' }} />
                <p className="icon-label">{thousandths(dlc)}</p>
              </div>
              <div className="comment-delete">
                <button
                  className="comment-icon"
                  type="button"
                  onClick={articleComments}
                  disabled={!isAuthenticated}
                >
                  <Icon name="comments" />
                </button>
                <p className="icon-label">{comment ? comment.length : 0}</p>
                {this.isMyArticle() && (
                  <button
                    className="delete-icon"
                    type="button"
                    onClick={this.deleteArticle}
                  >
                    <Icon name="trash" />
                  </button>
                )}
                <p>{' '}</p>
                <div
                  className="option-icon dropdown"
                >
                  <Icon
                    name="options"
                  />
                  <div className="dropdown-content">
                    <span
                      role="button"
                      onClick={() => this.handleClick('twitter')}
                    >
                      <TwitterShareButton url={`${appUrl}/articles/${slug}`}>
                        <TwitterIcon size={32} />
                      </TwitterShareButton>
                      <p>share on twitter</p>
                    </span>
                    <span
                      role="button"
                      onClick={() => this.handleClick('facebook')}
                    >
                      <FacebookShareButton url={`${appUrl}/articles/${slug}`}>
                        <FacebookIcon size={32} />
                      </FacebookShareButton>
                      <p>share on facebook</p>
                    </span>
                    <span
                      role="button"
                      onClick={() => this.handleClick('email')}
                    >
                      <EmailShareButton url={`${appUrl}/articles/${slug}`}>
                        <EmailIcon size={32} />
                      </EmailShareButton>
                      <p>share by email</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
}

ReadArticle.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  ui: PropTypes.shape().isRequired,
  getArticlesTag: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  likeDislikeAResource: PropTypes.func.isRequired,
  getLikedAResource: PropTypes.func.isRequired,
};

export default connectComponent(
  withRouter(ReadArticle), {
    getSingleArticle: slug => readArticle(slug),
    deleteArticle: (slug, history) => deleteAnArticle(slug, history),
    getArticlesTag: getArticlesWithTagFromDb,
    follow: (username) => followUser(username),
    unfollow: (username) => unFollowUser(username),
    fetchProfile: getProfile,
    likeDislikeAResource,
    getLikedAResource,
  },
);
