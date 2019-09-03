/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '@Components/Header/index';
import Button from '@Components/Button/index';
import Footer from '@Components/Footer/index';
import Dialog from '@Components/Dialog/index';
import Input from '@Components/Input/index';
// import EditProfile from '@Components/Forms/EditProfile/EditProfile';
import ArticleCard from '@Components/ArticleCard/index';
import connectComponent from '@Lib/connect-component';
import { getProfile, editProfile } from '../../actions/profileAction';
import { getArticles } from '../../actions/articleAction';
import { postImage } from '../../actions/imageAction';
import './Profile.scss';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.fileInput = React.createRef();
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

  handleClick = () => {
    this.setState({
      dialogOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  }

  renderProfileCards = (data) => (
    <div className="single-article" key={data.id}>
      <ArticleCard type="horizontal" data={data} />
    </div>
  );

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value,
      },
    }));
  };

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
        bio: bios,
        image,
      },
    } = this.state;
    const bio = bios || 'none'; // validation requires that a bio of type string must be provided, which is not ideal
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
      dialogOpen: false,
      profile: {
        ...prevState.profile,
        username: Username,
        email: Email,
        image: Image,
        bio: Bio,
      },
    }));
    localStorage.setItem('username', username);
  }

  render() {
    const {
      dialogOpen, profile:
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
    return (
      <div>
        <Header />
        { dialogOpen ? (
          <Dialog>
            <span className="close" onClick={this.handleClose}>&times;</span>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <Input
                name="email"
                value={email}
                type="email"
                handleChange={this.handleChange}
                label="email"
                // error={errors.email}
              />

              <Input
                name="username"
                value={username}
                type="text"
                handleChange={this.handleChange}
                label="username"
              />

              <Input
                name="bio"
                value={bio || ''}
                type="text"
                handleChange={this.handleChange}
                label="bio"
              />
              {/* <input type="text" id="email" placeholder="enter email" value={email} onChange={this.handleChange} /> */}
              {/* <input type="text" id="username" placeholder="enter username" value={username} onChange={this.handleChange} /> */}
              {/* <input type="text" id="bio" placeholder="enter bio" value={bio || ''} onChange={this.handleChange} /> */}
              <input type="file" id="image" name="file" placeholder="image" onChange={this.handleImageChange} />
              <button type="submit">edit</button>
            </form>
          </Dialog>
        ) : (null)}

        <div className="profile-container">
          <div className="sidebar">
            <ul>
              <li><a href="/">New Article</a></li>
              <li><a href="/">Bookmarks</a></li>
              <li><a href="/">Account</a></li>
              <li><a href="/">Stats</a></li>
              <li><a href="/">Notification</a></li>
              <li><a href="/">Help</a></li>
              <li><a href="/">Log Out</a></li>
            </ul>
          </div>
          <div className="main">
            <div className="profile-header">
              <div className="profile-details">
                <div className="name-button">
                  <h3>{`${firstname} ${lastname}`}</h3>
                  <span><Button handleClick={this.handleClick}>Edit Profile</Button></span>
                  <span><p>{`@${username}`}</p></span>
                </div>
                <p>
                  { bio }
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
                <a href="/">Profile</a>
              </li>
              <li>
                <a href="/">Likes</a>
              </li>
              <li>
                <a href="/">Highlighted</a>
              </li>
              <li>
                <a href="/">Comments</a>
              </li>
            </ul>
          </div>
          <div />
          <div className="profile-article">
            {article && article.map(a => this.renderProfileCards(a))}
          </div>
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
};

export default connectComponent(
  (Profile), {
    fetchProfile: getProfile,
    fetchArticle: getArticles,
    updateProfile: editProfile,
    uploadImage: postImage,
  },
);
