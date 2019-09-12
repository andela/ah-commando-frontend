/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Button from '@Components/Button';
// import Comment from '@Components/Comment';
// import { getComment, postComment } from '@Actions/commentActions';
// import connectComponent from '@Lib/connect-component';

// CommentPage.propTypes = {
//   postId: PropTypes.func,
//   postComment: PropTypes.func,
//   getComment: PropTypes.func,
// };

// CommentPage.defaultProps = {
//   postId: PropTypes.func,
//   postComment: PropTypes.func,
//   getComment: PropTypes.func,
// };

// export default connectComponent(
//   withRouter(CommentPage), {
//     postComments: postComment,
//     getComments: getComment,
//   },
// );

import React from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import connectComponent from '@Lib/connect-component';
import { getComment, postComment } from '@Actions/commentActions';
import Comment from '@Components/Comment';
import './CommentPage.scss';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
    };
  }

  componentDidMount = async () => {
    const { fetchComments, match: { params: { articleId } } } = this.props;
    await fetchComments(articleId);
    const { comments: { comments: { comments } } } = this.props;
    this.setState({
      comments,
    });
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.comments === this.props.comments) return;
    const { fetchComments, match: { params: { articleId } } } = this.props;
    await fetchComments(articleId);
    const { comments: { comments: { comments } } } = this.props;
    this.setState({
      comments,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { createComment, match: { params: { articleId } } } = this.props;
    const { comment } = this.state;
    await createComment(comment, articleId);
    this.clearComment();
  }

  clearComment = () => {
    this.setState({
      comment: '',
    });
  }

  render = () => {
    const { ui: { loading } } = this.props;

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

    const { comments } = this.state;
    const {
      auth: {
        user: {
          id,
        },
      },
    } = this.props;

    const pageheading = comments.map(comment => {
      return (
        <div className="comment-article-title">
          <h2>{comment.article.title}</h2>
        </div>
      );
    });

    const singleComment = comments ? comments.map(comment => {
      return (
        <Comment
          avatar={comment.author.image}
          key={comment.id}
          author={comment.author.username}
          body={comment.body}
          alt={comment.author.firstname}
          createdAt={comment.createdAt}
          likesCount={comment.likesCount}
          dislikesCount={comment.dislikesCount}
        />
      );
    })
      : (
        <div>
          {loading && loader}
        </div>
      );

    return (
      <div className="commentPage">
        <div className="comment-titles">
          <h3>Showing comments for:</h3>
          {pageheading[0]}
        </div>
        <div className="new-comment">
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <input
              id={id}
              className="comment-input"
              name="comment"
              value={this.state.comment}
              placeholder="Leave a comment..."
              type="text"
              onChange={this.handleChange}
            />
          </form>
        </div>
        {singleComment}
      </div>
    );
  }
}

// CommentPage.propTypes = {

// };

export default connectComponent(
  withRouter(CommentPage), {
    fetchComments: articleId => getComment(articleId),
    createComment: (newComment, articleId) => postComment(newComment, articleId),
  },
);
