/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@Components/Icon';
import connectComponent from '@Lib/connect-component';
import { updatePageNumber } from '../../actions/searchActions';
import './Pager.scss';

export class Pager extends Component {
  constructor(props) {
    super(props);
    this.displayPages = this.displayPages.bind(this);
    this.updatePageNumber = this.updatePageNumber.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  updatePageNumber(number) {
    this.props.updatePageNumber(number);
  }

  previousPage() {
    const { filters } = this.props;
    const page = filters.page;
    if (page > 1) {
      this.updatePageNumber(page - 1);
    }
  }

  nextPage() {
    const { filters } = this.props;
    const page = filters.page;
    const articles = filters.searchResults;
    const totalArticles = articles.length;
    const pages = Math.ceil(totalArticles / 20);
    if (page < pages) {
      this.updatePageNumber(page + 1);
    }
  }

  displayPages(pages) {
    const result = [];
    for (let i = 1; i <= pages; i += 1) {
      const page = <Page key={i} handleChange={this.updatePageNumber}>{i}</Page>;
      result.push(page);
    }
    return result;
  }

  render() {
    const { filters } = this.props;
    const articles = filters.searchResults;
    const totalArticles = articles.length;
    const pages = Math.ceil(totalArticles / 20);
    const searchQuery = filters.searchQuery;

    return (
      <div className="pager_container">
        <div className="title">
          <h3>{`Search result for "${searchQuery}"`}</h3>
        </div>
        <div className="page_number">
          <Arrows direction="left_arrow" handleClick={this.previousPage} />
          {this.displayPages(pages)}
          <Arrows direction="right_arrow" handleClick={this.nextPage} />
        </div>
      </div>
    );
  }
}

export const Arrows = (props) => {
  const { direction, handleClick } = props;
  return (
    <div className="arrow-container" onClick={() => { handleClick(); }}>
      <Icon name={direction} />
    </div>
  );
};

Arrows.propTypes = {
  direction: PropTypes.string.isRequired,
};

export const Page = (props) => {
  const { children, handleChange } = props;
  return (
    <div className="page-container" onClick={() => { handleChange(children); }}>
      <p>{ children }</p>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.number.isRequired,
};

export default connectComponent(Pager, { updatePageNumber });
