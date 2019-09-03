/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, withRouter } from 'react-router-dom';
import Button from '@Components/Button';
import AuthStore from '@Lib/AuthStore';
import Icon from '@Components/Icon';
import connectComponent from '@Lib/connect-component';
import { updateSearchQuery, getArticles, updatePageNumber } from '@Actions/searchActions';
import logo from '../../../public/logo.png';
import './Header.scss';

const buttonStyle = {
  width: '100px',
  height: '35px',
};
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleClick = () => {
    this.setState({
      search: true,
    });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.props.updateSearchQuery(e.target.value);
      this.props.getArticles(e.target.value);
      this.props.updatePageNumber(1);
      this.props.history.push('/search');
    }
  };

  handleBlur = () => {
    this.setState({
      search: false,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <>
        <header className="header-top">
          <img className="logo" src={logo} alt="" />
          <div className="search">
            <div>
              <div>
                {search ? <input type="text" onKeyUp={(e) => { this.handleKeyUp(e); }} placeholder="Search..." onBlur={this.handleBlur} /> : ''}
              </div>
              <button
                type="button"
                className="searchButton"
                onClick={this.handleClick}
              >
                <Icon name="search" />
              </button>
            </div>
            <span style={search ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }}>{' '}</span>
          </div>
          {AuthStore.getToken()
            ? (
              <div className="action">
                <Button handleClick={this.handleClick}>
                  <Icon name="notification" />
                </Button>
                <Button handleClick={this.handleClick}>Upgrade</Button>
              </div>
            )
            : (
              <div className="action">
                <Button style={buttonStyle} handleClick={this.handleClick}>signin</Button>
                <Button style={buttonStyle} handleClick={this.handleClick}>signup</Button>
              </div>
            )}
        </header>
        <div className={`navigation ${this.props.display}`}>
          <ul>
            <Link to="/a">Technology</Link>
            <Link to="/a">Health</Link>
            <Link to="/a">Culture</Link>
            <Link to="/a">Science</Link>
            <Link to="/a">Fashion</Link>
            <Link to="/a">Education</Link>
            <Link to="/a">Lifestyle</Link>
            <Link to="/a">Nature</Link>
          </ul>
        </div>
      </>
    );
  }
}
export default connectComponent(
  withRouter(Header), {
    updateSearchQuery,
    getArticles,
    updatePageNumber,
  },
);
