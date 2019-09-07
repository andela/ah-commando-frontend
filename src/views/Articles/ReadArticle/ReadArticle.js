import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router-dom';
import Header from '@Components/Header';
import { readArticle } from '@Actions/Articles';
import connectComponent from '@Lib/connect-component';
import Icon from '@Components/Icon';
import { convertToHtml } from '@Utils/';
import './ReadArticle.scss';

class ReadArticle extends Component {
  componentDidMount = async () => {
    const {
      getSingleArticle,
      match: {
        params: {
          slug,
        },
      },
    } = this.props;
    await getSingleArticle(slug);
  }

  parseArticleBody = article => {
    if (!article) {
      return null;
    }
    try {
      return convertToHtml(JSON.parse(article));
    } catch (e) {
      return article;
    }
  }

  render = () => {
    const {
      article: {
        title,
        description,
        author,
        createdAt,
        readTime,
        image,
        articleBody,
        tagList,
        likesCount,
        dislikesCount,
        comment,
        slug,
      },
      history,
    } = this.props;
    const tags = tagList ? tagList.split(' ')
      .filter(tag => tag.length > 0)
      .map((tag, i) => (<li key={i}><p>{tag}</p></li>)) : null;
    const body = this.parseArticleBody(articleBody);

    return (
      <>
        <Header />
        <div className="read-article">
          <div className="article-header vertical-center">
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
            <div className="article-user center">
              <div className="article-user-details">
                <div className="article-img-div center">
                  <img
                    src={author ? author.image : 'https://via.placeholder.com/150'}
                    alt="profile pic"
                  />
                </div>
                <div className="article-details-div center">
                  <div className="vertical-center name-date">
                    <p className="author-name">{author ? author.username : 'Loading...'}</p>
                    <p className="created-date">{moment(createdAt).format('MMM DD, YYYY')}</p>
                  </div>
                  <div className="vertical-center read-time">
                    <p>{`${readTime || 0} min${readTime > 1 ? 's' : ''} read`}</p>
                    <button
                      type="button"
                      onClick={() => history.push(`/articles/${slug}/edit`)}
                    >
                      Edit Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-article-image-div">
            <img
              src={image}
              alt="HD pic"
            />
          </div>
          <main className="center">
            <article>
              {ReactHtmlParser(body)}
            </article>
          </main>
          <div className="article-tag-div">
            <ul>
              {tags}
            </ul>
          </div>
          <div className="article-stats-div">
            <div className="center like-count">
              <Icon name="likes" />
              <p className="icon-label">{likesCount}</p>
              <Icon name="dislikes" />
              <p className="icon-label">{dislikesCount}</p>
            </div>
            <div className="comment-count">
              <Icon name="comments" />
              <p className="icon-label">{comment ? comment.length : 0}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
}

ReadArticle.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default connectComponent(
  withRouter(ReadArticle), {
    getSingleArticle: slug => readArticle(slug),
  },
);
