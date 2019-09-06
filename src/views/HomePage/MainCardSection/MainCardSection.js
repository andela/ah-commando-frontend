import React, { Component } from 'react';
import ArticleCard from '@Components/ArticleCard';
import PropTypes from 'prop-types';
import connect from '@Lib/connect-component';
import './MainCardSection.scss';

export class MainCardSection extends Component {
  handleClick = (e, position) => {
    if (position === 'left') {
      e.target.parentElement.nextElementSibling.scrollLeft += 200;
    } else e.target.parentElement.previousElementSibling.scrollLeft -= 200;
  };

  render() {
    const { homePageArticles: { articleCategories } } = this.props;
    if (!articleCategories[0]) {
      return (
        <div data-test="loadingComponent">
          {''}
        </div>
      );
    }

    const articles = articleCategories.map((catergory) => {
      const { name, Articles } = catergory;
      if (Articles.length > 0) {
        const render = Articles.length > 4;
        return (
          <section key={catergory.id} className="featuredsection" data-test="featuredsection">
            <div className="header">
              <p>{name}</p>
              <button type="button">
                <p>{'more  >'}</p>
              </button>
            </div>
            <ArticleCard type="horizontal" data={Articles[0]} />
            <div className="btn left">
              {render ? <button data-test="leftbtn" type="button" onClick={(e) => this.handleClick(e, 'left')}>{'<'}</button> : ''}
            </div>
            <section className="verticalCards">
              {
                Articles.filter((article, i) => i > 0).map((article) => <ArticleCard key={article.id} type="vertical" data={article} />)
              }
            </section>
            <div className="btn right">
              {render ? <button data-test="rightbtn" type="button" onClick={(e) => this.handleClick(e, 'right')}>{'>'}</button> : ''}
            </div>
          </section>
        );
      } return (
        <div data-test="noRender">
          {''}
        </div>
      );
    });

    return (
      articles
    );
  }
}

MainCardSection.propTypes = {
  homePageArticles: PropTypes.shape({
    articleCategories: PropTypes.arrayOf(
      PropTypes.shape({
        map: PropTypes.func,
        image: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        likes: PropTypes.string,
        dislikes: PropTypes.string,
        comments: PropTypes.string,
        readTime: PropTypes.number,
        author: PropTypes.shape({
          firstname: PropTypes.string,
          lastname: PropTypes.string,
          image: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default connect(MainCardSection);
