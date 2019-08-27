import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '@Components/ArticleCard';

const Home = () => (
  <div>
<<<<<<< HEAD:src/views/HomePage/index.js
    <h1 data-test="homepageComponent">Home</h1>
    <Link to="/login">Click to Login</Link>
    <ArticleCard />
=======
    <h1>Home</h1>
    <Link to="/login" data-test="login-link">Click to Login</Link>
    <TestComponent />
>>>>>>> feat(setup-e2e): Setup end-to-end-testing:src/views/Home.js
  </div>
);

export default Home;
