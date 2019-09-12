/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleCard from '@Components/ArticleCard';
import connectComponent from '@Lib/connect-component';
import './CategoryBody.scss';

export class CategoryBody extends Component {
  constructor(props) {
    super(props);
    this.displayCards = this.displayCards.bind(this);
  }

  displayCards(articles) {
    if (articles && articles.length) {
      const { category, category: { clickedCategory, page } } = this.props;
      const pageArticles = category[clickedCategory];
      const start = (page - 1) * 30;
      const end = start + 30 > pageArticles.length ? (pageArticles.length) : start + 30;
      const displayResults = pageArticles.slice(start, end);

      const result = [];
      let start2 = 0;
      let end2 = 5;
      let bigCardArticles = displayResults.slice(start2, end2);
      while (bigCardArticles.length) {
        const articleDisplay = <ArticleDisplay key={start2} articles={bigCardArticles} />;
        result.push(articleDisplay);
        start2 = end2;
        end2 += 5;
        bigCardArticles = displayResults.slice(start2, end2);
      }
      return result;
    }
  }

  render() {
    const { category: { clickedCategory, [`${clickedCategory}`]: articles } } = this.props;
    if (!articles) {
      return (
        <div className="loading">
          <p>Loading...</p>
        </div>
      );
    }
    const cards = this.displayCards(articles);
    return (
      <div className="articles">
        { cards }
      </div>
    );
  }
}

CategoryBody.propTypes = {
  category: PropTypes.shape({
    clickedCategory: PropTypes.string,
  }).isRequired,
};

const getVerticalCards = (articles) => {
  const verticalArticles = articles.slice(1);
  return verticalArticles.map((article, index) => (
    <div className="padding">
      <ArticleCard key={index} type="vertical" data={article} />
    </div>
  ));
};

export const ArticleDisplay = (props) => {
  const { articles } = props;
  const verticalCards = getVerticalCards(articles);
  return (
    <div className="display-container">
      <div className="articles_horizontal">
        <ArticleCard type="horizontal" data={articles[0]} />
      </div>
      <div className="articles_vertical">
        { verticalCards }
      </div>
    </div>
  );
};

ArticleDisplay.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connectComponent(CategoryBody);
