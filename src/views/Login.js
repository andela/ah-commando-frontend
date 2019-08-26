import React from 'react';
import { Link } from 'react-router-dom';
import TestComponent from '@Components/TestComponent';

export const Login = () => (
  <div>
    <h1>Login</h1>
    <Link to="/">Click to go Home</Link>
    <TestComponent />
  </div>
);

export default Login;
