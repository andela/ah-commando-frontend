/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Button from '@Components/Button';
import Footer from '@Components/Footer';
import Input from '@Components/Input';
import TextArea from '@App/components/TextArea/';
import ArticleCard from '@Components/ArticleCard/';
import connectComponent from '@Lib/connect-component';
import { getProfile, editProfile, getArticles } from '@Actions/profileAction';
import { postImage } from '@Actions/imageAction';
import Icon from '@Components/Icon';
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
        firstname: '',
        lastname: '',
        followerCount: '',
        followingCount: '',
      },
      article: [],
    };
    this.dialog = React.createRef();
  }

  async componentDidMount() {
    const { fetchProfile, fetchArticle } = this.props;
    const profileResponse = await fetchProfile();
    const articleResponse = await fetchArticle();
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        ...profileResponse.payload,
      },
      article: articleResponse.payload,
    }));
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
      // eslint-disable-next-line no-nested-ternary
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
    } = this.state;
    const { image: { loading } } = this.props;
    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;
    const noArticle = () => (
      <h1 className="no-article">You have no articles yet</h1>
    );
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
                  width: '100%',
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

                  <span>
                    <Button
                      handleClick={() => this.handleToggleEditProfileModal('open')}
                      datatest="edit-button"
                      style={{ padding: '0px 5px', width: '150px' }}
                    >
                      Edit Profile
                    </Button>
                  </span>
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
  }),
};

export default connectComponent(
  (Profile), {
    fetchProfile: getProfile,
    fetchArticle: getArticles,
    updateProfile: editProfile,
    uploadImage: postImage,
  },
);
