import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextArea from '@Components/TextArea';
import Button from '@Components/Button';
// import Comment from '@Components/Comment';
import { getComments } from '@Actions/commentActions';
import connectComponent from '@Lib/connect-component';
// import Comment from '@Components/Comment';

class CommentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
    };
  }

  componentDidMount() {
    const { getComment, postId } = this.props;
    getComment(postId);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { postComment } = this.props;
    const { comment } = this.state;
    const newComment = comment;
    postComment(newComment);
    this.clearComment();
  }

  clearComment = () => {
    this.setState({
      comment: '',
    });
  }

  // singleComment = (comments) => {
  //   const data = comments.map(comment => (
  //     <>
  //       <Comment
  //         key={comment.id}
  //         name={comment.author.username}
  //         alt={comment.author.username}
  //         body={comment.body}
  //       />
  //     </>
  //   ));
  //   return data;
  // }

  render() {
    const { comments } = this.state;
    const { comment } = this.state;

    console.log('commnet in render', comments, comment);

    const data = this.singleComment(comments);
    return (
      <div margin="0px auto">
        <div>{data}</div>
        <form onSubmit={this.handleSubmit}>
          <TextArea
            name="comment"
            value={comment}
            type="text"
            label="Comment"
            handleChange={this.handleChange}
            style={{
              height: '50px',
              width: '250px',
            }}
          />
          <Button type="submit" onSUbmit={() => this.handleSubmit}>Send</Button>
        </form>
      </div>
    );
  }
}

CommentPage.propTypes = {
  postId: PropTypes.number,
  postComment: PropTypes.func,
  getComment: PropTypes.func,
};

CommentPage.defaultProps = {
  postId: PropTypes.number,
  postComment: PropTypes.func,
  getComment: PropTypes.func,
};

export default connectComponent(
  withRouter(CommentPage), {
    // post: postComment,
    getComment: getComments,
  },
);
