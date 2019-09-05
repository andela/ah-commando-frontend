import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import connectComponent from '@Lib/connect-component';
import ArticleCard from '@Components/ArticleCard';
import Header from '@Components/Header';
import SignIn from '@Components/Forms/SignIn';
import SignUp from '@Components/Forms/SignUp';
import { openModal } from '@Actions/uiActions';
// import Button from '@Components/Button';

const data = {
  title: 'Will AI take over programming',
  description: 'As the technology explodes, a growing movement of local legislation is setting ..',
  authorName: 'IgweChinonso',
  image: 'https://res.cloudinary.com/dwawmgnac/image/upload/v1564566304/samples/landscapes/beach-boat.jpg',
  likes: 20,
  dislikes: 20,
  comments: 25,
  readTime: 5,
};

export const Home = () => (
  <div data-test="homepage">
    <Header />
    <h1 data-test="homepageComponent">Home</h1>
    <Link to="/login">Click to Login</Link>
    <ArticleCard type="horizontal" data={data} />
    <ArticleCard type="vertical" data={data} />
    {/* <Button
      label="SIGN IN"
      handleClick={signIn}
      disabled={false}
      type="button"
    />
    <Button
      label="SIGN UP"
      handleClick={signUp}
      disabled={false}
      type="button"
    /> */}
    <SignIn />
    <SignUp />
  </div>
);

// Home.propTypes = {
//   signIn: PropTypes.func.isRequired,
//   signUp: PropTypes.func.isRequired,
// };

export default connectComponent(Home, {
  signIn: () => openModal('signin'),
  signUp: () => openModal('signup'),
});
