import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { ReadArticle } from './ReadArticle';

chai.should();

describe('<ReadArticle /> Component', () => {
  let wrapper, props, mainDiv, instance;

  beforeEach(() => {
    props = {
      getSingleArticle: jest.fn(),
      deleteArticle: jest.fn(),
      article: {
        title: 'title',
      },
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          slug: '',
        },
      },
      auth: {
        isAuthenticated: true,
        user: {
          id: 5,
        },
      },
      ui: {
        loading: false,
      },
    };
    wrapper = shallow(<ReadArticle {...props} />);
    instance = wrapper.instance();
    mainDiv = wrapper.find('div').first();
  });

  it('Renders as expected', () => {
    mainDiv.hasClass('read-article').should.equal(true);
    wrapper.containsMatchingElement(<h1>{props.article.title}</h1>).should.equal(true);
  });

  it('Should get article as soon as component mounts', () => {
    instance.componentDidMount();

    expect(props.getSingleArticle).toHaveBeenCalled();
  });

  it('Should parse the article body successfully', () => {
    const article = 'This is the article body';
    const body = instance.parseArticleBody(article);

    body.should.equal(article);
  });

  it('Should navigate to the edit page when the editArticle() function is called', () => {
    instance.editArticle();
    expect(props.history.push).toHaveBeenCalled();
  });
});
