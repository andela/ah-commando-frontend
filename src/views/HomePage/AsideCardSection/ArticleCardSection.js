/* eslint-disable react/require-default-props */
import React from 'react';
import ArticleCard from '@Components/ArticleCard';
import PropTypes from 'prop-types';
import connect from '@Lib/connect-component';
import './AsideCardSection.scss';

export const ArticleCardSection = (props) => {
  const { homePageArticles: { editorsChoice }, reactRef } = props;
  if (editorsChoice.data[0].description === '') {
    return (
      <div data-test="loadingComponent">
        {''}
      </div>
    );
  }

  const { data } = editorsChoice;

  return (
    <section className="editorsChoice" data-test="editorsChoice" ref={reactRef}>
      <div className="header">
        <p>Editors choice</p>
      </div>
      <section className="everticalCards">
        {
          data.map((article) => <ArticleCard key={article.id} type="vertical" data={article} />)
        }
      </section>
    </section>
  );
};

ArticleCardSection.propTypes = {
  reactRef: PropTypes.shape(),
  homePageArticles: PropTypes.shape({
    editorsChoice: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          map: PropTypes.func,
          image: PropTypes.string,
          title: PropTypes.string,
          description: PropTypes.string,
          likes: PropTypes.string,
          dislikes: PropTypes.string,
          comments: PropTypes.arrayOf(),
          readTime: PropTypes.number,
          author: PropTypes.shape({
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            image: PropTypes.string,
          }),
        }),
      ),
    }),
  }),
};

export default connect(ArticleCardSection);
