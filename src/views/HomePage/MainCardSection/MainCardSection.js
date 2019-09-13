/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ArticleCard from '@Components/ArticleCard';
import PropTypes from 'prop-types';
import Icon from '@Components/Icon';
import { NavLink } from 'react-router-dom';
import connect from '@Lib/connect-component';
import './MainCardSection.scss';

export class MainCardSection extends Component {
  handleClick = (e, position, index) => {
    if (position === 'left') {
      this[`articleRef${index}`].scrollLeft -= 200;
    } else {
      this[`articleRef${index}`].scrollLeft += 200;
    }
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

    const articles = articleCategories.map((catergory, index) => {
      const { name, Articles } = catergory;
      let ArticleIndex = -1;
      if (Articles.length > 0) {
        const render = Articles.length > 4;
        return (
          <section key={catergory.id} className="featuredsection" data-test="featuredsection">
            <div className="header">
              <p>{name}</p>
              <NavLink to={{ pathname: '/articles', search: `?category=${name.toLowerCase()}` }} datatest="nav-link">
                <div className="more-button">
                  <p>more</p>
                  <button type="button">
                    <Icon name="right_arrow" />
                  </button>
                </div>
              </NavLink>
            </div>
            <ArticleCard
              type="horizontal"
              data={
                Articles.find((article, index) => {
                  ArticleIndex = index;
                  return article.image !== '';
                })
              }
            />
            <div className="btn left">
              {render ? (
                <button data-test="leftbtn" type="button" onClick={(e) => this.handleClick(e, 'left', index)}>
                  <Icon name="angleLeft" />
                </button>
              ) : ''}
            </div>
            <section className="verticalCards" ref={section => { this[`articleRef${index}`] = section; }}>
              {
                Articles.filter((article, i) => (i > 0 && i < 8 && article.image !== '' && i !== ArticleIndex)).map((article) => <ArticleCard key={article.id} type="vertical" data={article} />)
              }
            </section>
            <div className="btn right">
              {render ? (
                <button data-test="rightbtn" type="button" onClick={(e) => this.handleClick(e, 'right', index)}>
                  <Icon name="angleRight" />
                </button>
              ) : ''}
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
