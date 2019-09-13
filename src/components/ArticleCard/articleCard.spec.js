import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttribute } from '@Utils/';
import { ArticleCard } from './';

let wrapper;
const shallowRender = (props) => {
  const component = shallow(<ArticleCard type="horizontal" {...props} />);
  return component;
};

describe('Article component test', () => {
  describe('Should render with props', () => {
    const props = {
      data: {
        image: 'image.com',
        title: 'title',
        author: {
          firstname: 'author',
          lastname: 'test',
        },
        likes: 12,
        dislikes: 3,
        comment: [{
          elelemt: 1,
        }],
        readTime: 3,
      },
      type: '',
      likeDislikeAResource: jest.fn(),
      getLikedAResource: jest.fn(),
    };
    beforeEach(() => {
      wrapper = shallowRender(props);
    });

    it('should render without crashing', () => {
      const component = wrapper.find('.image-container');
      expect(component.length).toBe(1);
    });

    it('should render with empty comment article', () => {
      props.data.comment = [];
      const emptyProp = {
        data: props.data,
      };
      const componentWrapper = shallowRender(emptyProp);
      const component = componentWrapper.find('.image-container');
      expect(component.length).toBe(1);
    });

    it('should render loading div with empty prop objects', () => {
      const emptyProp = {
        data: null,
      };
      const loadingWrapper = shallowRender(emptyProp);
      const component = findByTestAttribute(loadingWrapper, 'loadingComponent');
      expect(component.length).toBe(1);
    });

    it('should not throw a warning with the correct prop type', () => {
      const expectedProps = {
        type: 'vertical',
        data: props.data,
      };
      const error = checkProps(wrapper, wrapper.protypes, expectedProps);
      expect(error).toBeUndefined();
    });

    it('should render a .image-container class', () => {
      expect(wrapper.find('.image-container')).toHaveLength(1);
    });

    it('should render a .article-details class', () => {
      expect(wrapper.find('.article-details')).toHaveLength(1);
    });

    it('Should test the onError image method, and update state', () => {
      wrapper.find('img').simulate('error');
      const appInstance = wrapper.instance();
      const { state: { loading, error } } = appInstance;
      expect(loading).toBe(1);
      expect(error).toBe(true);
    });


    it('successfully calls the onLoad handler', () => {
      wrapper.find('img').simulate('load');
      const appInstance = wrapper.instance();
      const { state: { loading } } = appInstance;
      expect(loading).toBe(1);
    });
  });
  describe('test like or dislike and article', () => {
    let instance;
    const props = {
      data: {
        image: 'image.com',
        title: 'title',
        author: {
          firstname: 'author',
          lastname: 'test',
        },
        likes: 12,
        dislikes: 3,
        comment: [{
          elelemt: 1,
        }],
        readTime: 3,
      },
      type: '',
      likeDislikeAResource: jest.fn().mockReturnValueOnce(false),
      getLikedAResource: jest.fn(),
    };
    beforeEach(() => {
      wrapper = shallowRender(props);
      instance = wrapper.instance();
    });
    it('should like an article', async () => {
      const likeBtn = wrapper.find('.like-icon');
      const e = {
        stopPropagation: jest.fn(),
        currentTarget: {
          attributes: [0, {
            value: '',
          }],
        },
      };
      const id = 21;
      const type = 'article';
      likeBtn.simulate('click', e);
      await instance.likeOrDislike(e, id);
      const action = e.currentTarget.attributes[1].value;
      instance.checkLikeAction(action);
      await props.likeDislikeAResource(action, id, type);
      expect(props.likeDislikeAResource).toMatchSnapshot();
    });
    it('should generate name by like action', () => {
      const likeBtn = wrapper.find('.like-icon');
      instance.state = {
        likeAction: 'like',
      };
      const e = {
        currentTarget: {
          attributes: [{}, {
            value: 'like',
          }],
        },
      };
      likeBtn.simulate('click', e);
      expect(instance.state.likeAction).toBe('like');
      instance.generateNameByLikeAction();
      expect(instance.generateNameByLikeAction()).toBe('boldLikes');
    });
    it('should generate name by like action should return likes', () => {
      const likeBtn = wrapper.find('.like-icon');
      instance.state = {
        likeAction: 'dislikes',
      };
      const e = {
        currentTarget: {
          attributes: [{}, {
            value: 'dislikes',
          }],
        },
      };
      likeBtn.simulate('click', e);
      expect(instance.state.likeAction).toBe('dislikes');
      instance.generateNameByLikeAction();
      expect(instance.generateNameByLikeAction()).toBe('likes');
    });
    it('should generate name by dislike action', () => {
      const dislikeBtn = wrapper.find('.dislike-icon');
      instance.state = {
        likeAction: 'dislike',
      };
      const e = {
        currentTarget: {
          attributes: [{}, {
            value: 'dislike',
          }],
        },
      };
      dislikeBtn.simulate('click', e);
      expect(instance.state.likeAction).toBe('dislike');
      instance.generateNameByDisLikeAction();
      expect(instance.generateNameByDisLikeAction()).toBe('boldDislikes');
    });
    it('should generate name by dislike action should return dislikes', () => {
      const dislikeBtn = wrapper.find('.dislike-icon');
      instance.state = {
        likeAction: 'like',
      };
      const e = {
        currentTarget: {
          attributes: [{}, {
            value: 'like',
          }],
        },
      };
      dislikeBtn.simulate('click', e);
      expect(instance.state.likeAction).toBe('like');
      instance.generateNameByDisLikeAction();
      expect(instance.generateNameByDisLikeAction()).toBe('dislikes');
    });
  });
});
