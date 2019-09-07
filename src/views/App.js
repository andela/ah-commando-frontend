import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '@Views/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Search from '@Views/SearchPage/SearchPage';
import Home from '@Views/HomePage';
import ResetPassword from '@Views/ResetPassword';
import CreateArticle from '@Views/Articles/CreateArticle';
import Profile from '@Views/ProfilePage';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/create-article" component={CreateArticle} />
    </div>
  </BrowserRouter>
);

export default App;
