/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import Header from '@Components/Header';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import { openModal } from '@Actions/uiActions';
import { readArticle } from '@Actions/Articles';
import PublishArticleModal from '../PublishArticle/PublishArticle';
import { editor, isEmpty } from '@Utils/';
import '@Views/Articles/CreateArticle/CreateArticle.scss';

export class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      title: '',
      articleBody: '',
      readyToSubmit: true,

    };
  }

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
    const { article } = this.props;
    this.setState({
      title: article.title,
    });
  }

  publish = async () => {
    const { title } = this.state;
    const { open } = this.props;
    const article = await this.editor.save();
    if (this.readyToSubmit(title, article)) {
      this.setState({
        articleBody: article,
      });
      return open();
    }
    swal({
      text: 'Your article should have a title and body',
      icon: 'warning',
      button: {
        className: 'sweet-alert-btn',
      },
    });
  }

  readyToSubmit = (title, articleBody) => {
    const { length } = articleBody.blocks;
    if ((length > 0) && title.length > 0) {
      return true;
    }
    return false;
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  parseArticleBody = article => {
    if (!article) {
      return null;
    }
    try {
      return JSON.parse(article);
    } catch (e) {
      return article;
    }
  }

  render = () => {
    const { article } = this.props;
    if (!isEmpty(article)) {
      const { articleBody } = article;
      const text = this.parseArticleBody(articleBody);
      if (!this.editor) {
        this.editor = editor(text);
      }
    }
    const {
      title,
      articleBody,
      readyToSubmit,
    } = this.state;
    return (
      <>
        <Header />
        <div className="article-div">
          <div className="article">
            <div className="align-right">
              <Button
                type="button"
                disabled={!readyToSubmit}
                handleClick={this.publish}
                label="Edit"
                style={{
                  borderRadius: '5px',
                  width: '100%',
                }}
              />
            </div>
            <input
              className="article-title"
              type="text"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
              autoFocus
              autoComplete="off"
              value={title}
            />
            <div id="article-div" />
          </div>
        </div>
        <PublishArticleModal
          title={title}
          articleBody={JSON.stringify(articleBody)}
          article={!isEmpty(article) ? article : {}}
          edit
        />
      </>
    );
  };
}

EditArticle.propTypes = {
  open: PropTypes.func.isRequired,
  getSingleArticle: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
};

export default connectComponent(EditArticle, {
  open: () => openModal('publish'),
  getSingleArticle: slug => readArticle(slug),
});
