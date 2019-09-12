/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { withRouter, Link } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import Loader from 'react-loader-spinner';
import { readArticle, deleteAnArticle } from '@Actions/Articles';
import { getArticlesWithTagFromDb } from '@Actions/tagAction';
import { getProfile } from '@Actions/profileAction';
import RenderButton from '@Components/RenderButton';
import connectComponent from '@Lib/connect-component';
import Icon from '@Components/Icon';
import { followUser } from '@Actions/followActions';
import { unFollowUser } from '@Actions/unfollowActions';
import { convertToHtml, isEmpty } from '@Utils/';
import './ReadArticle.scss';

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
    userToken: '',
    username: '',
    isFollowing: false,
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
    const userProfile = jwtDecode(localStorage.getItem('haven')).username;
    const user = await fetchProfile();
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        followings: user.payload.followings,
      },
      userToken: userProfile,
    }));

    await getSingleArticle(slug);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article && prevProps.article.author) {
      if (prevProps.article.author.username !== prevState.username) {
        this.setState(prevState => ({
          ...prevState,
          username: prevProps.article.author.username,
        }));

        const { profile: { followings }, username } = this.state;
        followings.forEach((fellow) => {
          if (fellow.username === username) {
            this.setState(prevState => ({
              ...prevState,
              isFollowing: true,
            }));
          }
        });
      }
    }
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

  handleTagClick = async (tag) => {
    const { getArticlesTag, history } = this.props;
    await getArticlesTag(tag, history);
  }

  handleFollowUser = async () => {
    const { follow, article: { author: { username } } } = this.props;
    await follow(username);
    this.setState(prevState => ({
      ...prevState,
      isFollowing: true,
    }));
  };

  handleUnFollowUser = async () => {
    const { unfollow, article: { author: { username } } } = this.props;
    await unfollow(username);
    this.setState(prevState => ({
      ...prevState,
      isFollowing: false,
    }));
  };

  handleProfile = () => {
    const { article: { author: { username } } } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.history.push(`/profiles/${username}`);
  };


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
        likesCount,
        dislikesCount,
        comment,
      },
    } = this.props;

    const tags = Tags ? Tags.map((tag, i) => (
      <li className="liTag" key={i}>
        <p onClick={() => this.handleTagClick(tag.name)}>{tag.name}</p>
      </li>
    )) : null;
    const { userToken, isFollowing } = this.state;
    const profile = {
      username: author && author.username,
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
                      <RenderButton
                        handleUnFollowUser={this.handleUnFollowUser}
                        handleFollowUser={this.handleFollowUser}
                        userToken={this.state && userToken}
                        isFollowing={this.state && isFollowing}
                        profile={profile}
                      />
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
              <div className="center like-count">
                <Icon name="likes" />
                <p className="icon-label">{likesCount}</p>
                <Icon name="dislikes" />
                <p className="icon-label">{dislikesCount}</p>
              </div>
              <div className="comment-delete">
                <Icon name="comments" />
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
};

export default connectComponent(
  withRouter(ReadArticle), {
    getSingleArticle: slug => readArticle(slug),
    deleteArticle: (slug, history) => deleteAnArticle(slug, history),
    getArticlesTag: getArticlesWithTagFromDb,
    follow: (username) => followUser(username),
    unfollow: (username) => unFollowUser(username),
    fetchProfile: getProfile,
  },
);
