/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectComponent from '@Lib/connect-component';
import { NavLink } from 'react-router-dom';
import {
  getCategoryArticles, updateCategory, updateMenuItem, updateCategoryPageNumber,
} from '@Actions/categoryActions';
import './SideBar.scss';

const categories = [
  { name: 'Technology' }, { name: 'Health' }, { name: 'Travel' },
  { name: 'Science' }, { name: 'Education' }, { name: 'Culture' },
  { name: 'Lifestyle' }, { name: 'Nature' }, { name: 'Fashion' },
];

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.displayCategories = this.displayCategories.bind(this);
    this.getArticleCategory = this.getArticleCategory.bind(this);
    this.updateSelectedMenu = this.updateSelectedMenu.bind(this);
  }

  componentDidMount() {
    const { getCategoryArticles, updateCategory } = this.props;
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const category = params.get('category');
    const index = categories.findIndex((cate) => (cate.name.toLowerCase() === category));
    getCategoryArticles(category);
    updateCategory(category);
    if (index >= 0) this.updateSelectedMenu(index);
  }

  getArticleCategory(category) {
    const { getCategoryArticles, updateCategory, updateCategoryPageNumber } = this.props;
    updateCategoryPageNumber(1);
    getCategoryArticles(category);
    updateCategory(category);
  }

  updateSelectedMenu(index) {
    const { category: { selectedIndex }, updateMenuItem } = this.props;
    categories[selectedIndex].selected = false;
    categories[index].selected = true;
    updateMenuItem(index);
  }

  displayCategories() {
    return categories.map((category, index) => (
      <Item
        className="category-field"
        key={index}
        index={index}
        handleClick={this.getArticleCategory}
        category={category.name}
        selected={category.selected}
        activeMenu={this.updateSelectedMenu}
      />
    ));
  }

  render() {
    const items = this.displayCategories();
    return (
      <div className="sidebar-container">
        <h3>Categories</h3>
        <div className="categories">
          { items }
        </div>
      </div>
    );
  }
}

export const Item = (props) => {
  const {
    handleClick, category, selected, index, activeMenu,
  } = props;

  const setActiveState = () => {
    handleClick(category);
    activeMenu(index);
  };

  return (
    <NavLink to={{ pathname: '/articles', search: `?category=${category.toLowerCase()}` }}>
      <h4
        className={`category-field ${selected ? 'active' : ''}`}
        onClick={() => { setActiveState(); }}
      >
        { category }
      </h4>
    </NavLink>
  );
};

Item.propTypes = {
  handleClick: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  activeMenu: PropTypes.func.isRequired,
};

SideBar.propTypes = {
  getCategoryArticles: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  updateMenuItem: PropTypes.func.isRequired,
  updateCategoryPageNumber: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  category: PropTypes.shape({
    selectedIndex: PropTypes.number,
  }).isRequired,
};

export default connectComponent(SideBar, {
  getCategoryArticles, updateCategory, updateMenuItem, updateCategoryPageNumber,
});
