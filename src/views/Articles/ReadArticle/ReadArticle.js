/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import Loader from 'react-loader-spinner';
import { readArticle, deleteAnArticle } from '@Actions/Articles';
import { getArticlesWithTagFromDb } from '@Actions/tagAction';
import connectComponent from '@Lib/connect-component';
import Icon from '@Components/Icon';
import { convertToHtml, isEmpty } from '@Utils/';
import './ReadArticle.scss';

export class ReadArticle extends Component {
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

  editArticle = () => {
    const { history, article: { slug } } = this.props;
    history.push(`/articles/${slug}/edit`);
  }

  isMyArticle = () => {
    const {
      article,
      auth: {
        isAuthenticated,
        user: {
          id,
        },
      },
    } = this.props;
    const authorId = !isEmpty(article) ? article.authorId : 0;

    return isAuthenticated && (authorId === id);
  }

  deleteArticle = () => {
    swal({
      text: 'Are you sure? Once deleted, this cannot be undone!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const { article: { slug }, history, deleteArticle } = this.props;
          deleteArticle(slug, history);
        }
      });
  }

  handleTagClick = async (tag) => {
    const { getArticlesTag, history } = this.props;
    await getArticlesTag(tag, history);
  }

  render = () => {
    const {
      ui: { loading },
      article: {
        title,
        description,
        author,
        createdAt,
        readTime,
        image,
        articleBody,
        Tags,
        likesCount,
        dislikesCount,
        comment,
      },
    } = this.props;

    const tags = Tags ? Tags.map((tag, i) => (
      <li className="liTag" key={i}>
        <p onClick={() => this.handleTagClick(tag.name)}>{tag.name}</p>
      </li>
    )) : null;
    const body = this.parseArticleBody(articleBody);

    const loader = (
      <div data-test="loader" className="loader">
        <Loader
          type="ThreeDots"
          color="#ffa500"
          height={150}
          width={150}
        />
      </div>
    );

    return (
      <>
        {loading ? loader : (
          <div className="read-article">
            <div className="article-header vertical-center">
              <h1 className="title">{title}</h1>
              <p className="description">{description}</p>
              <div className="article-user center">
                <div className="article-user-details">
                  <div className="article-img-div center">
                    <img
                      src={
                        author && author.image !== null ? author.image
                          : 'https://res.cloudinary.com/drdje1skj/image/upload/v1567427029/profile-placeholder_gvxkia.gif'
                      }
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
                      {this.isMyArticle() && (
                        <button
                          data-test="edit-article"
                          type="button"
                          onClick={this.editArticle}
                        >
                          Edit Article
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-article-image-div">
              <img
                src={image}
                alt=""
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
              <div className="comment-delete">
                <Icon name="comments" />
                <p className="icon-label">{comment ? comment.length : 0}</p>
                {this.isMyArticle() && (
                  <button
                    className="delete-icon"
                    type="button"
                    onClick={this.deleteArticle}
                  >
                    <Icon name="trash" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
}

ReadArticle.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  ui: PropTypes.shape().isRequired,
  getArticlesTag: PropTypes.func.isRequired,
};

export default connectComponent(
  withRouter(ReadArticle), {
    getSingleArticle: slug => readArticle(slug),
    deleteArticle: (slug, history) => deleteAnArticle(slug, history),
    getArticlesTag: getArticlesWithTagFromDb,
  },
);
