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
      const result = [];
      let start = 0;
      let end = 5;
      let bigCardArticles = articles.slice(start, end);
      while (bigCardArticles.length) {
        const articleDisplay = <ArticleDisplay key={start} articles={bigCardArticles} />;
        result.push(articleDisplay);
        start = end;
        end += 5;
        bigCardArticles = articles.slice(start, end);
      }
      return result;
    }
  }

  render() {
    const { category: { clickedCategory, [`${clickedCategory}`]: articles } } = this.props;
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
