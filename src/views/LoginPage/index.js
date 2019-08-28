import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '@Components/ArticleCard/';

const Login = () => (
  <div data-test="loginPageComponent">
    <h1>Login</h1>
    <Link to="/">Click to go Home</Link>
    <ArticleCard />
  </div>
);

export default Login;
