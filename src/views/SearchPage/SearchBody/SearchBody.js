import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ArticleCard from '@Components/ArticleCard';
import connectComponent from '@Lib/connect-component';
import { getFilteredArticles } from '@Actions/searchActions';
import './SearchBody.scss';

export class SearchBody extends Component {
  articleDisplay = () => {
    const { filters } = this.props;
    const articles = filters.searchResults;
    if (articles[0] === 'No result found') {
      return 'No result found for this search';
    }
    const { page } = filters;
    const start = (page - 1) * 30;
    const end = start + 30 > articles.length ? (articles.length) : start + 30;
    const displayResults = articles.slice(start, end);
    const cards = displayResults.map((article, index) => (
      <div className="padding">
        <ArticleCard
          type="horizontal"
          key={index}
          data={article}
        />
      </div>
    ));

    return cards;
  }

  render() {
    const items = this.articleDisplay();
    if (items === 'No result found for this search') {
      return (
        <div className="no-result">
          <h2> No result found for this search</h2>
        </div>
      );
    } if (!items.length) {
      return (
        <div className="loading">
          <h2> Loading...</h2>
        </div>
      );
    }
    return (
      <div className="articles-container">
        {items}
      </div>
    );
  }
}

SearchBody.propTypes = {
  filters: PropTypes.shape({
    page: PropTypes.number,
    searchResults: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connectComponent(SearchBody, { getFilteredArticles });
