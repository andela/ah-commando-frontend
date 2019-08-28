import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '@Components/ArticleCard';

const Home = () => (
  <div data-test="first-test">
    <h1>Home</h1>
    <Link data-test="login-link" to="/login">Click to Login</Link>
    <ArticleCard />
  </div>
);

export default Home;
