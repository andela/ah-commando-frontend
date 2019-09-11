import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '@Views/LoginPage';
import Search from '@Views/SearchPage/SearchPage';
import Home from '@Views/HomePage';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SignUp from '@Components/Forms/SignUp';
import CategoryPage from '@Views/CategoryPage/CategoryPage';
import SignIn from '@Components/Forms/SignIn';
import Header from '@Components/Header';
import ResetPassword from '@Views/ResetPassword';
import CreateArticle from '@Views/Articles/CreateArticle';
import ReadArticle from '@Views/Articles/ReadArticle';
import EditArticle from '@Views/Articles/EditArticle';
import Profile from '@Views/ProfilePage';
import NotFound from '@Views/404';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <SignIn />
    <SignUp />
    <Header />
    <div data-test="appComponent">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/create-article" component={CreateArticle} />
        <Route exact path="/articles/:slug" component={ReadArticle} />
        <Route exact path="/articles/:slug/edit" component={EditArticle} />
        <Route exact path="/articles" component={CategoryPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
