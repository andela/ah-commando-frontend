import React from 'react';
import Filter from './Filter';
import Footer from '../../components/Footer';
import SearchBody from './SearchBody';
import Pager from './Pager';
import './SearchPage.scss';
import Header from '../../components/Header';

const SearchPage = () => (
  <div className="search_page">
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
