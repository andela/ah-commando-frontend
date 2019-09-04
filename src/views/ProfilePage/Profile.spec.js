import { shallow } from 'enzyme';
import React from 'react';
import findByTestAttribute from '@Utils/';
import { Profile } from './Profile';

const state = {
  errors: {},
  isFormValid: true,
  dialogOpen: false,
  profile: {
    username: '',
    email: '',
    image: '',
    bio: '',
    firstname: '',
    lastname: '',
    followerCount: '',
    followingCount: '',
  },
  article: [],
};

const props = {
  fetchProfile: jest.fn(() => Promise.resolve({
    payload: {
      id: 1,
      username: 'test',
      bio: 'this is my bio',
      image: 'testimage.png',
      email: 'email.gmail.com',
    },
  })),
  handleToggleEditProfileModal: jest.fn(),
  handleChange: jest.fn(),
  validateForm: jest.fn(),
  handleImageChange: jest.fn(),
  handleSubmit: jest.fn(),
  updateProfile: jest.fn(() => Promise.resolve({
    payload: {
      username: 'u', email: 'e', bio: 'b', image: 'i',
    },
  })),
  fetchArticle: jest.fn(() => Promise.resolve({
    id: 60,
    title: 'chinosons',
    articleBody: 'jghsuhuhdhdhdhd jdhjdhjdgfhjfgfj',
    description: 'chinonso djdhjijhfifjfocvivc',
    tagList: 'hiufh djhdidjhd',
    uuid: '1f1106f0',
    slug: 'chinosons-1f1106f0',
    readTime: 0,
    favorited: false,
    favoriteCounts: 0,
    image: 'http://res.cloudinary.com/dutbqk0ux/image/upload/v1564500447/gdiitdzy9l0usls1keom.png',
    authorId: 29,
    likesCount: 0,
    dislikesCount: 0,
    readCount: 0,
    createdAt: '2019-09-04T10:38:23.968Z',
    updatedAt: '2019-09-04T10:38:23.968Z',
  })),
  uploadImage: jest.fn(() => {}),
  renderProfileCards: jest.fn(() => {}),
  image: {
    loading: false,
  },
};

describe('Profile component test', () => {
  let wrapper, instance;
  describe('have props', () => {
    beforeEach(() => {
      const setUp = (propss) => shallow(<Profile {...propss} />);
      wrapper = setUp(props);
      instance = wrapper.instance();
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('Should render without error', () => {
      const component = findByTestAttribute(wrapper, 'profileComponent');
      expect(component.length).toBe(1);
    });

    it('Should render without error', () => {
      wrapper.setState({
        article: [{
          id: 60,
          title: 'chinosons',
          articleBody: 'jghsuhuhdhdhdhd jdhjdhjdgfhjfgfj',
          description: 'chinonso djdhjijhfifjfocvivc',
          tagList: 'hiufh djhdidjhd',
          uuid: '1f1106f0',
          slug: 'chinosons-1f1106f0',
          readTime: 0,
          favorited: false,
          favoriteCounts: 0,
          image: 'http://res.cloudinary.com/dutbqk0ux/image/upload/v1564500447/gdiitdzy9l0usls1keom.png',
          authorId: 29,
          likesCount: 0,
          dislikesCount: 0,
          readCount: 0,
          createdAt: '2019-09-04T10:38:23.968Z',
          updatedAt: '2019-09-04T10:38:23.968Z',
        }],
      });
      const component = findByTestAttribute(wrapper, 'articleCard');
      expect(component.length).toBe(1);
    });

    it('set profile to state', () => {
      instance.componentDidMount();
      setTimeout(() => {
        expect(instance.state.profile.username).toBe('test');
      }, 2000);
    });

    it('set profile to state', () => {
      instance.handleToggleEditProfileModal();
      expect(instance.state.dialogOpen).toBe(true);
      const header = wrapper.find('.profile-heading');
      expect(header).toHaveLength(1);
    });

    it('set profile to state', () => {
      instance.handleToggleEditProfileModal();
      instance.handleToggleEditProfileModal();
      expect(instance.state.dialogOpen).toBe(false);
      const header = wrapper.find('.profile-heading');
      expect(header).toHaveLength(0);
    });

    it('set profile to state', () => {
      const event = {
        target: {
          name: 'username',
          value: 'testuser',
        },
      };
      instance.handleChange(event);
      expect(instance.state.profile.username).toBe(event.target.value);
    });

    it('set profile to state', () => {
      wrapper.setState({
        profile: {
          email: 'nongmail.com',
          username: 'Test',
        },
      });
      instance.validateForm();
      expect(instance.setFormValidity(state.errors)).toBe(true);
    });

    it('set profile to state', () => {
      wrapper.setState({
        profile: {
          email: 'non@gmail.com',
          username: 'ttest',
          bio: 'new bio',
          image: 'image.jpg',
        },
      });
      setTimeout(() => {
        expect(instance.setFormValidity(state.errors)).toBe(false);
      }, 2000);
    });

    it('set profile to state', () => {
      wrapper.setState({
        profile: {
          email: 'non@gmail.com',
          username: 'ttest',
          bio: 'new bio',
          image: 'image.jpg',
        },
      });
      instance.validateForm();
      setTimeout(() => {
        expect(instance.state.errors.email).toBe('');
      }, 2000);
    });

    it('set profile to state', () => {
      instance.handleImageChange();
      instance.handleToggleEditProfileModal();
      const fileContents = 'file contents';
      const file = new Blob([fileContents], { type: 'text/plain' });
      const append = jest.fn();
      const run = jest.fn((_, evtHandler) => { evtHandler(); });
      const dummyFileReader = { run, append, result: fileContents };
      window.FormData = jest.fn(() => dummyFileReader);
      jest.spyOn(wrapper, 'setState');
      wrapper.find('input[type="file"]').simulate('change', { target: { files: [file] } });
    });

    it('handle submit event', () => {
      instance.handleSubmit();
      setTimeout(() => {
        expect(instance.state.profile.username).toBe('u');
      }, 2000);
    });
  });
});
