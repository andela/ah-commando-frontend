import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { CommentPage } from './CommentPage';

chai.should();

describe('<CommentPage /> Component', () => {
  let wrapper, props, instance, mainDiv, state;

  beforeEach(() => {
    state = {
      comment: '',
      comments: [],
    };
    props = {
      fetchComments: jest.fn(),
      createComments: jest.fn(),
      comments: {
        comments: {
          comments: 'this is the comment',
        },
      },
      match: {
        params: {
          articleId: 3,
        },
      },
      auth: {
        isAuthenticated: true,
        user: {
          id: 7,
        },
      },
      ui: {
        loading: false,
      },
    };

    wrapper = shallow(<CommentPage {...props} />);
    wrapper.setState(state);
    instance = wrapper.instance();
    mainDiv = wrapper.find('div').first();
  });

  it('Renders as expected', () => {
    mainDiv.hasClass('commentPage').should.equal(true);
  });

  it('Should get comments as soon as component mounts', () => {
    instance.componentDidMount();
    expect(props.fetchComments).toHaveBeenCalled();
  });

  it('Should get all comments as soon as component updates', () => {
    const prevProps = {
      comments: props.comments,
    };
    instance.componentDidUpdate(prevProps);
  });

  it('Should get all comments as soon as component updates', () => {
    const prevProps = {
      comments: 'null',
    };
    instance.componentDidUpdate(prevProps);
    expect(props.fetchComments).toHaveBeenCalled();
  });

  it('Should set the state based on changes from the form', () => {
    const event = {
      target: {
        name: 'comment',
        value: 'thecommentiwant',
      },
    };
    instance.handleChange(event);
    wrapper.state().comment.should.equal(event.target.value);
  });

  it('Should call the call the createComment function when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleSubmit(event);
    instance.clearComment();
  });
});
