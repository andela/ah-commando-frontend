import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '@Views/ProfilePage/Profile';
import RenderButton from './index';
import { ReadArticle } from '../../views/Articles/ReadArticle/ReadArticle';


const props = {
  ui: { loading: true },
  article: {
    title: 'title',
    description: 'desc',
    author: { username: 'author' },
    createdAt: '2019-09-04T10:38:23.968Z',
    updatedAt: '2019-09-04T10:38:23.968Z',
    readTime: 4,
    image: 'image.pg',
    articleBody: 'article body',
    tagList: 'tags',
    likesCount: 9,
    dislikesCount: 8,
    comment: 'a comment',
  },
  handleProfile: jest.fn(),
  author: { username: 'my usrname' },
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
  uploadImage: jest.fn(() => { }),
  renderProfileCards: jest.fn(() => { }),
  image: {
    loading: false,
  },
  follow: jest.fn(() => Promise.resolve({
    message: 'successfull',
    status: 200,
  })),
  unfollow: jest.fn(() => Promise.resolve({
    message: 'successfull',
    status: 200,
  })),
  history: [],
  profile: { user: { username: 'test username' } },
  userToken: 'test userToken',
  isFollowing: false,
  handleUnFollowUser: jest.fn(),
  handleFollowUser: jest.fn(),
};

describe('Render button tests', () => {
  const wrapper = shallow(<Profile {...props} />);
  const button = wrapper.find('renderButton');
  it('should render compnents with correct props', () => {
    expect(button.length).toBe(1);
  });
});

describe('Render button tests', () => {
  const wrapper = shallow(<Profile {...props} />);
  const instance = wrapper.instance();
  it('should render compnents with correct props', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render compnents with correct props', () => {
    instance.handleFollowUser('usernmae');
    setTimeout(() => {
      expect(instance.state.isFollowing).toBe(true);
    });
  });

  it('should render compnents with correct props', () => {
    instance.handleUnFollowUser('usernmae');
    setTimeout(() => {
      expect(instance.state.isFollowing).toBe(false);
    });
  });
});

describe('Render button tests', () => {
  const wrapper = shallow(<ReadArticle {...props} />);
  const instance = wrapper.instance();
  it('should render compnents with correct props', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render compnents with correct props', () => {
    instance.handleFollowUser('usernmae');
    setTimeout(() => {
      expect(instance.state.isFollowing).toBe(true);
    });
  });

  it('should render compnents with correct props', () => {
    instance.handleUnFollowUser('usernmae');
    setTimeout(() => {
      expect(instance.state.isFollowing).toBe(false);
    });
  });

  it('should render compnents with correct props', () => {
    instance.handleProfile();
    setTimeout(() => {
      expect(instance.handleProfile).toHaveBeenCalled();
      expect(instance.history.length).toBe(1);
    });
  });

  it('should render compnents with correct props', () => {
    const prevProps = {
      article: { author: { username: 'my username' } },
    };
    const prevState = {
      article: { author: { username: 'my username' } },
    };
    instance.componentDidUpdate(prevProps, prevState);
    setTimeout(() => {
      expect(instance.componentDidUpdate).toHaveBeenCalled();
    });
  });

  it('should render compnents with correct props', () => {
    const prevProps = {
      article: { author: { username: 'my username' } },
    };
    const prevState = {
      article: { author: { username: 'my username' } },
    };
    instance.setState({
      profile: {
        followings: [
          {
            username: 'followingUser1',
          },
          {
            username: 'my username',
          },
        ],
      },
      username: 'testusername',
    });


    instance.componentDidUpdate(prevProps, prevState);
    setTimeout(() => {
      expect(instance.state.followings[0].username).toBe('followingUser1');
      expect(instance.state.isFollowing).toBe(false);
    });
  });
});

describe('Render button tests', () => {
  const wrapper = shallow(<RenderButton {...props} />);
  it('should render compnents with correct props', () => {
    expect(wrapper.length).toBe(1);
  });
});
