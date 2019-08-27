import React from 'react';
import { Link } from 'react-router-dom';
import TestComponent from '@Components/TestComponent';

export const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to="/login">Click to Login</Link>
    <TestComponent />
  </div>
);

export default Home;
