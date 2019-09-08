import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './Filter.scss';
import connectComponent from '@Lib/connect-component';
import {
  updateFilters, displayFilters, removeFilters, getFilteredArticles,
} from '@Actions/searchActions';
import FilterComponents from './FilterComponents';

const catego = ['Technology', 'Health', 'Travel', 'Science', 'Education', 'Culture', 'Lifestyle', 'Nature', 'Fashion'];
const { CategorySelection, FilterContainer, DropMenu } = FilterComponents;

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.filterResult = this.filterResult.bind(this);
  }

  filterResult = () => {
    const { getFilteredArticles } = this.props;
    getFilteredArticles();
  }

  handleInputChange = (e, field) => {
    const { updateFilters, removeFilters } = this.props;
    if (e.keyCode === 13) {
      e.preventDefault();
      updateFilters({ field, value: e.target.value });
      e.target.value = '';
      this.filterResult();
    } else if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        updateFilters({ field, value: e.target.value });
      } else {
        removeFilters({ field, value: e.target.value });
      }
      this.filterResult();
    }
  }

  handleDelete = (field, value) => {
    const { removeFilters } = this.props;
    removeFilters({ field, value });
    this.filterResult();
  }

  handleDisplayFilters = (field) => {
    const { displayFilters } = this.props;
    displayFilters(field);
  }

  getCategories = () => catego.map((field, index) => (
    <CategorySelection
      name={field}
      key={index}
      handleChange={this.handleInputChange}
    />
  ))

  render() {
    const { filters } = this.props;
    const catFields = this.getCategories();
    const { categories, tags, authors } = filters.displayFields;
    return (
      <div className="filter-container">
        <h3>Filters</h3>
        <div className="categories">
          <div className="filter-header">
            <DropMenu
              handleClick={this.handleDisplayFilters}
              header="categories"
            />
            <h3> Categories </h3>
          </div>
          <div className={`input-fields ${categories}`}>
            { catFields }
          </div>
        </div>
        <FilterContainer
          handleClick={this.handleDisplayFilters}
          handleChange={this.handleInputChange}
          display={tags}
          filtername="tags"
          selections={filters.updateFields.tags}
          IconClick={this.handleDelete}
        />
        <FilterContainer
          handleClick={this.handleDisplayFilters}
          handleChange={this.handleInputChange}
          display={authors}
          filtername="authors"
          selections={filters.updateFields.authors}
          IconClick={this.handleDelete}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  displayFilters: PropTypes.func.isRequired,
  getFilteredArticles: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    displayFields: PropTypes.shape({
      categories: PropTypes.string,
      tags: PropTypes.string,
      authors: PropTypes.string,
    }),
    updateFields: PropTypes.shape({
      categories: PropTypes.array,
      tags: PropTypes.array,
      authors: PropTypes.array,
    }),
  }).isRequired,
};
export default connectComponent(Filter, {
  updateFilters, displayFilters, removeFilters, getFilteredArticles,
});
