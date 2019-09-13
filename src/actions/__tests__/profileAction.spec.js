import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getProfile,
  getProfileStart,
  getProfileSuccess,
  editProfile,
  getArticles,
  getArticlesStart,
  getArticlesSuccess,
} from '@Actions/profileAction';

jest.mock('../profileFunc');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
describe('profile action tests', () => {
  localStorage.setItem('haven', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoibm9ub2p1IiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzMwMTcsImV4cCI6MTU2NzYxOTQxN30.YYgbnLLX0hRzxSpSPLR5wj04lzJnTjUKBZlRh_-T9CI');

  it('it should render a profile successfully', () => {
    const expectedAction = {
      type: 'GET_PROFILE_SUCCESS',
      payload: {
        id: 1,
        email: 'nonso@mail.com',
      },
    };
    expect(getProfileSuccess(expectedAction.payload)).toEqual(expectedAction);
  });

  it('it should start the rendering process', () => {
    const expectedAction = {
      type: 'GET_PROFILE_START',
    };
    expect(getProfileStart()).toEqual(expectedAction);
  });

  it('It should not render if username does not match', () => {
    mock.onGet('https://a-haven-staging.herokuapp.com/api/v1/profiles/',
      {
        params: { username: 'nono' },
      }).reply(200, {
      user: [
        { id: 1, firstname: 'calix' },
      ],
    });

    const store = mockStore({ });
    return store.dispatch(getProfile()).then((data) => {
      const expectedAction = {
        type: 'GET_PROFILE_FAILURE',
        error: { error: 'Authorization error', status: 401 },
      };
      expect(data).toEqual(expectedAction);
    });
  });

  it('it should not render if email is wrong', () => {
    localStorage.setItem('haven', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoibm9ub2p1IiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzMwMTcsImV4cCI6MTU2NzYxOTQxN30.YYgbnLLX0hRzxSpSPLR5wj04lzJnTjUKBZlRh_-T9CI');
    mock.onPut('https://a-haven-staging.herokuapp.com/api/v1/user/').reply(200, {
      user: [{ id: 2, email: 'nonso@mail.com' },
      ],
    });

    const store = mockStore({ });
    return store.dispatch(editProfile()).then((data) => {
      const expectedAction = {
        type: 'EDIT_PROFILE_FAILURE',
        error: { error: 'Authorization error', status: 401 },
      };
      expect(data).toEqual(expectedAction);
    });
  });
});

describe('profile action', () => {
  localStorage.setItem('haven', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoibm9ub2p1IiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzMwMTcsImV4cCI6MTU2NzYxOTQxN30.YYgbnLLX0hRzxSpSPLR5wj04lzJnTjUKBZlRh_-T9CI');
  afterEach(() => {
    mock.reset();
  });
  it('it should get all articles', () => {
    const expectedAction = {
      type: 'GET_ARTICLE_SUCCESS',
      payload: {
        title: 'article title',
        description: 'article description',
      },
    };
    expect(getArticlesSuccess(expectedAction.payload)).toEqual(expectedAction);
  });

  it('it should get articles start', () => {
    const expectedAction = {
      type: 'GET_ARTICLE_START',
    };
    expect(getArticlesStart()).toEqual(expectedAction);
  });

  it('it should get articles start', () => {
    const store = mockStore({ });
    store.dispatch(getArticlesStart);
    return store.dispatch(getArticles()).then((data) => {
      const expectedAction = {
        type: 'GET_ARTICLE_SUCCESS',
        payload: [],
      };
      expect(data).toEqual(expectedAction);
    });
  });
});

describe('test for image', () => {
  it('it should render an image', async () => {
    const article = {
      title: 'image title',
      description: 'image description',
    };
    const dispatch = jest.fn();
    await getArticles(article)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
