import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getArticles,
  getArticlesStart,
  getArticlesSuccess,
} from '../articleAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('profile action', () => {
  localStorage.setItem('haven', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoibm9ub2p1IiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzMwMTcsImV4cCI6MTU2NzYxOTQxN30.YYgbnLLX0hRzxSpSPLR5wj04lzJnTjUKBZlRh_-T9CI');
  afterEach(() => {
    mock.reset();
  });
  it('success', () => {
    const expectedAction = {
      type: 'GET_ARTICLE_SUCCESS',
      payload: {
        title: 'article title',
        description: 'article description',
      },
    };
    expect(getArticlesSuccess(expectedAction.payload)).toEqual(expectedAction);
  });

  it('success', () => {
    const expectedAction = {
      type: 'GET_ARTICLE_START',
    };
    expect(getArticlesStart()).toEqual(expectedAction);
  });

  it('test', () => {
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
