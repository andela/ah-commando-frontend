import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@Components/Icon';
import connectComponent from '@Lib/connect-component';
import { updateCategoryPageNumber } from '@Actions/categoryActions';
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
    const { updateCategoryPageNumber } = this.props;
    updateCategoryPageNumber(number);
  }

  previousPage() {
    const { category: { page } } = this.props;
    if (page > 1) {
      this.updatePageNumber(page - 1);
    }
  }

  nextPage() {
    const { category, category: { clickedCategory, page } } = this.props;
    const articles = category[clickedCategory];
    const totalArticles = articles.length;
    const pages = Math.ceil(totalArticles / 30);
    if (page < pages) {
      this.updatePageNumber(page + 1);
    }
  }

  displayPages(pages) {
    const result = [];
    const { category: { page } } = this.props;
    for (let i = 1; i <= pages; i += 1) {
      const pages = (
        <Page
          key={i}
          handleChange={this.updatePageNumber}
          index={i}
          selected={i === page}
        >
          {i}
        </Page>
      );
      result.push(pages);
    }
    return result;
  }

  render() {
    const { category, category: { clickedCategory } } = this.props;
    const articles = category[clickedCategory];
    const totalArticles = articles && articles.length;
    const pages = Math.ceil(totalArticles / 30);

    return (
      <div className="pager_container">
        <div className="title">
          <h3>{`Articles in "${clickedCategory.charAt(0).toUpperCase() + clickedCategory.slice(1)}"`}</h3>
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

Pager.propTypes = {
  category: PropTypes.shape({
    clickedCategory: PropTypes.string,
    page: PropTypes.number,
  }).isRequired,
  updateCategoryPageNumber: PropTypes.func.isRequired,
};

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
  handleClick: PropTypes.func.isRequired,
};

export const Page = (props) => {
  const { children, handleChange, selected } = props;
  return (
    <div className={`page-container ${selected ? 'active' : ''}`} onClick={() => { handleChange(children); }}>
      <p>{ children }</p>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default connectComponent(Pager, { updateCategoryPageNumber });
