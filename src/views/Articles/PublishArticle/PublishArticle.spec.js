import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { PublishArticle } from './PublishArticle';

chai.should();

describe('<PublishArticle /> Component', () => {
  let wrapper, props, instance, state;

  beforeEach(() => {
    state = {
      tags: [],
      descritption: '',
      btnText: '',
      image: '',
    };
    props = {
      ui: {},
      history: {
        push: jest.fn(),
      },
      close: jest.fn(),
      title: '',
      articleBody: '',
      uploadImage: jest.fn(),
      createNewArticle: jest.fn(),
      editArticle: jest.fn(),
      image: {},
      article: {
        title: 'title',
      },
      edit: false,
      match: {
        params: {
          slug: '',
        },
      },
    };
    wrapper = shallow(<PublishArticle {...props} />);
    wrapper.setState(state);
    instance = wrapper.instance();
  });

  it('Should set the state as soon as component updates with modalOpen prop', () => {
    instance.componentDidUpdate();
    instance.handleDelete(2);
    instance.handleAddition();
    instance.handleDrag();
  });

  it('Should close the modal', () => {
    instance.resetModal();
    expect(props.close).toHaveBeenCalled();
  });
});
