import React from 'react';
import Header from '@Components/Header';
import Footer from '@Components/Footer';
import Filter from './Filter';
import SearchBody from './SearchBody';
import Pager from './Pager';
import './SearchPage.scss';

const SearchPage = () => (
  <div className="search_page" datatest="searchPage-component">
    <div className="header">
      <Header display="hide" />
      <Pager />
    </div>
    <div className="filter">
      <Filter />
    </div>
    <div className="body">
      <SearchBody />
    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
);

export default SearchPage;
