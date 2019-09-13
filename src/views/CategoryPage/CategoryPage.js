import React from 'react';
import Footer from '@Components/Footer';
import CategoryBody from './CategoryBody/CategoryBody';
import Pager from './Pager';
import SideBar from './SideBar';
import './CategoryPage.scss';

const CategoryPage = (props) => (
  <div className="category-page">
    <div className="header">
      <Pager />
    </div>
    <div className="sidebar">
      <SideBar {...props} />
    </div>
    <div className="body">
      <CategoryBody />
    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
);

export default CategoryPage;
