/* istanbul ignore file */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import Header from '@Components/Header';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import { openModal } from '@Actions/uiActions';
import PublishArticleModal from '../PublishArticle/PublishArticle';
import { editor } from '@Utils/';
import './CreateArticle.scss';

export class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.editor = editor();
    this.state = {
      title: '',
      articleBody: '',
      readyToSubmit: true,
    };
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

  render = () => {
    const { title, articleBody, readyToSubmit } = this.state;
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
                label="Publish Article"
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
            />
            <div id="article-div" />
          </div>
        </div>
        <PublishArticleModal
          title={title}
          articleBody={JSON.stringify(articleBody)}
        />
      </>
    );
  };
}

CreateArticle.propTypes = {
  open: PropTypes.func.isRequired,
};

export default connectComponent(CreateArticle, { open: () => openModal('publish') });
