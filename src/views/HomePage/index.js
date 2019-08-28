import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '@Components/ArticleCard';

const Home = () => (
  <div>
    <h1 data-test="homepageComponent">Home</h1>
    <Link to="/login">Click to Login</Link>
    <ArticleCard />
  </div>
);

export default Home;
