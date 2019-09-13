/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Button from '@Components/Button';
import Footer from '@Components/Footer';
import Input from '@Components/Input';
import TextArea from '@App/components/TextArea/';
import ArticleCard from '@Components/ArticleCard/';
import connectComponent from '@Lib/connect-component';
import { getProfile, editProfile, getArticles } from '@Actions/profileAction';
import { followUser } from '@Actions/followActions';
import { unFollowUser } from '@Actions/unfollowActions';
import { postImage } from '@Actions/imageAction';
import Icon from '@Components/Icon';
import RenderButton from '@Components/RenderButton';

import {
  validate,
  emailSchema,
  usernameSchema,
  bioSchema,
} from '@Utils/';
import './Profile.scss';


export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isFormValid: true,
      dialogOpen: false,
      profile: {
        username: '',
        email: '',
        image: '',
        bio: '',
        followings: [],
        followers: [],
        firstname: '',
        lastname: '',
        followerCount: '',
        followingCount: '',
      },
      article: [],
      username: '',
      userToken: '',
      isFollowing: false,
    };
    this.dialog = React.createRef();
  }

  async componentDidMount() {
    const { fetchProfile, fetchArticle } = this.props;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    const myUsername = history.location.pathname.split('/')[2];
    const userProfile = () => {
      const { username, email } = jwtDecode(localStorage.getItem('haven'));
      if (username === undefined) return email;
      return username;
    };
    let profileResponse;
    let articleResponse;
    if (myUsername === userProfile()) {
      profileResponse = await fetchProfile();
      articleResponse = await fetchArticle();
    } else {
      profileResponse = await fetchProfile(myUsername);
      const { id } = profileResponse.payload;
      articleResponse = await fetchArticle(id);
    }

    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        ...profileResponse.payload,
        followings: profileResponse.payload.followings,
        followers: profileResponse.payload.followers,
      },
      article: articleResponse.payload,
      userToken: userProfile(),
    }));
    const { profile: { followers }, userToken } = this.state;
    followers.forEach((fellow) => {
      if (fellow.username === userToken) {
        this.setState(prevState => ({
          ...prevState,
          isFollowing: true,
        }));
      }
    });
  }

  handleToggleEditProfileModal = (status = 'open') => {
    if (status === 'close') return this.dialog.current.close(); this.dialog.current.showModal();
  }

  renderProfileCards = (data) => (
    <div className="single-article" key={data.id}>
      <ArticleCard type="vertical" data={data} />
    </div>
  );

  handleChange = event => {
    const { name, value } = event.target;
    const errors = {};
    const [errorValue] = validate({
      [name]: value,
    }, name === 'username' ? usernameSchema : name === 'bio' ? bioSchema : emailSchema);
    errors[name] = errorValue || '';
    this.setFormValidity(errors);
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value,
      },
      errors,
    }));
  };

  validateForm = () => {
    const errors = {};
    const {
      profile: {
        email,
        username,
        bio,
      },
    } = this.state;
    const [emailError] = validate({ email }, emailSchema);
    const [usernameError] = validate({ username }, usernameSchema);
    const [bioError] = validate({ bio }, bioSchema);
    errors.email = emailError || '';
    errors.username = usernameError || '';
    errors.bio = bioError || '';
    return this.setFormValidity(errors);
  }

  setFormValidity = (errors) => {
    let valid = true;
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        valid = false;
      }
    });
    this.setState({ isFormValid: valid });
    return valid;
  }


  handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const { uploadImage } = this.props;
    const response = await uploadImage(formData);
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        image: response.payload,
      },
    }));
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { updateProfile } = this.props;
    const {
      profile: {
        username,
        email,
        bio,
        image,
      },
    } = this.state;
    const response = await updateProfile({
      user: {
        username, email, bio, image,
      },
    });

    // set the returned data to state
    const { payload } = response;
    payload.email = email;
    const {
      username: Username,
      email: Email,
      bio: Bio,
      image: Image,
    } = payload;
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        username: Username,
        email: Email,
        image: Image,
        bio: Bio,
      },
    }));
    return this.dialog.current.close();
  }

  handleFollowUser = async () => {
    const { follow, profile: { user: { username } } } = this.props;
    await follow(username);
    this.setState(prevState => ({
      ...prevState,
      isFollowing: true,
    }));
  };

  handleUnFollowUser = async () => {
    const { unfollow, profile: { user: { username } } } = this.props;
    await unfollow(username);
    this.setState(prevState => ({
      ...prevState,
      isFollowing: false,
    }));
  };

  render() {
    const {
      errors,
      isFormValid,
      profile:
      {
        firstname,
        username,
        lastname,
        image,
        followerCount,
        followingCount,
        bio,
        email,
      },
      article,
      isFollowing,
      userToken,
    } = this.state;
    const { image: { loading } } = this.props;
    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;
    const noArticle = () => (
      <h1 className="no-article">{loading && loader}</h1>
    );
    const { profile } = this.state;
    return (
      <div data-test="profileComponent">
        <dialog ref={this.dialog}>
          <div className="container">
            <span className="close" onClick={() => this.handleToggleEditProfileModal('close')}>&times;</span>
            <h2 className="profile-heading">Edit your profile</h2>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="update-form">
              <input type="file" id="image" name="file" className="profile-img" onChange={this.handleImageChange} />
              <label htmlFor="image" className="form-label">
                <Icon name="camera" />
                <img src={image} alt="" className="form-image" />
              </label>
              <Input
                style={{
                  width: '100%',
                }}
                name="email"
                value={email}
                type="email"
                handleChange={this.handleChange}
                label="Email"
                error={errors.email}
              />

              <Input
                style={{
                  width: '100%',
                }}
                name="username"
                value={username}
                type="text"
                handleChange={this.handleChange}
                label="Username"
                error={errors.username}
              />

              <TextArea
                style={{
                  width: '101%',
                }}
                name="bio"
                value={bio || ''}
                type="text"
                label="Bio"
                error={errors.email}
                handleChange={this.handleChange}
              />

              <Button
                className="btn"
                label={loading ? null : 'Update Profile'}
                handleClick={this.handleSubmit}
                disabled={loading ? true : !isFormValid}
                type="submit"
                datatest="submit-button"
                style={{
                  height: '45px',
                  width: '95%',
                  marginLeft: '5%',
                  color: '#ffc700',
                  backgroundColor: '#000',
                  borderRadius: '0',
                }}
              >
                {loading && loader}
              </Button>
            </form>
          </div>
        </dialog>

        <div className="profile-container">
          <div className="sidebar">
            <ul>
              <li><Link to="/">New Article</Link></li>
              <li><Link to="/">Bookmarks</Link></li>
              <li><Link to="/">Account</Link></li>
              <li><Link to="/">Stats</Link></li>
              <li><Link to="/">Notification</Link></li>
              <li><Link to="/">Help</Link></li>
              <li><Link to="/">Log Out</Link></li>
            </ul>
          </div>
          <div className="main">
            <div className="profile-header">
              <div className="profile-details">
                <div className="name-button">
                  <h3>{`${firstname} ${lastname}`}</h3>

                  <RenderButton
                    handleToggleEditProfileModal={this.handleToggleEditProfileModal}
                    handleUnFollowUser={this.handleUnFollowUser}
                    handleFollowUser={this.handleFollowUser}
                    userToken={this.state && userToken}
                    isFollowing={this.state && isFollowing}
                    profile={this.state && profile}
                  />
                  <span style={{ marginTop: '10px' }}>
                    <p>{`@${username}`}</p>
                  </span>
                </div>
                <p>
                  {bio}
                </p>
                <p className="following-follower">
                  <span className="following">{`${followingCount} Following`}</span>
                  <span className="followers">{`${followerCount} Followers`}</span>
                </p>
              </div>
              <div className="profile-image">
                <img src={image} alt="" className="profile-image" />
              </div>
            </div>
          </div>
          <div />
          <div className="profile-links">
            <ul>
              <li className="active">
                <Link to="/">Profile</Link>
              </li>
              <li>
                <Link to="/">Likes</Link>
              </li>
              <li>
                <Link to="/">Highlighted</Link>
              </li>
              <li>
                <Link to="/">Comments</Link>
              </li>
            </ul>
          </div>
          <div />
          {article.length === 0 ? (noArticle()) : (
            <div className="profile-article" data-test="articleCard">
              {article && article.map(data => this.renderProfileCards(data))}
            </div>
          )}
        </div>
        <div className="profile-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  fetchArticle: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  image: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  unfollow: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape().isRequired,
};

export default connectComponent(
  withRouter(Profile), {
    fetchProfile: (username = null) => getProfile(username),
    fetchArticle: getArticles,
    updateProfile: editProfile,
    uploadImage: postImage,
    follow: (username) => followUser(username),
    unfollow: (username) => unFollowUser(username),
  },
);
