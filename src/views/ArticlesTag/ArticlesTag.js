/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ArticleCard from '@Components/ArticleCard';
import { getArticlesWithTagFromDb } from '@Actions/tagAction';
import connect from '@Lib/connect-component';
import './ArticlesTag.scss';

export class ArticleTags extends Component {
  constructor(props) {
    super(props);
  }

  displayCards = (articles, suppliedTag) => {
    const result = [];
    let start = 0;
    let end = 5;
    let bigCardArticles = articles.slice(start, end);
    while (bigCardArticles.length) {
      const articleDisplay = (
        <ArticlewithTags
          key={start}
          suppliedTag={suppliedTag}
          articles={bigCardArticles}
        />
      );
      result.push(articleDisplay);
      start = end;
      end += 5;
      bigCardArticles = articles.slice(start, end);
    }
    return result;
  }


  render() {
    const { tag } = this.props;
    const { articles, suppliedTag } = tag;

    const cards = this.displayCards(articles);
    return (
      <div className="articlesList">
        <div>
          <h3>
            Articles with tag
            {' '}
            {`"${suppliedTag}"`}
          </h3>
        </div>
        {cards}
      </div>
    );
  }
}

ArticleTags.propTypes = {
  tag: PropTypes.shape().isRequired,
};

const getVerticalCards = (articles) => {
  const verticalArticles = articles.slice(1);
  return verticalArticles.map((article, index) => (
    <div className="card">
      <ArticleCard key={index} type="vertical" data={article} />
    </div>
  ));
};

export const ArticlewithTags = (props) => {
  const { articles } = props;
  const verticalCards = getVerticalCards(articles);
  return (
    <div>
      <div className="horizontalSection">
        <ArticleCard type="horizontal" data={articles[0]} />
      </div>
      <div className="verticalSection">
        {verticalCards}
      </div>
    </div>

  );
};

ArticlewithTags.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(ArticleTags,
  { getArticlesTag: getArticlesWithTagFromDb });
