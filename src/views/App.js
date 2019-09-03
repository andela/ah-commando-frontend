import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import Filter from '@Views/SearchPage/Filter';
import Search from '@Views/SearchPage/SearchPage';
import Home from '@Views/HomePage';
import Profile from '@Views/ProfilePage';
import Login from '@Views/LoginPage';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search" component={Search} />
    </div>
  </BrowserRouter>
);

export default App;
