import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getProfile,
  getProfileStart,
  getProfileSuccess,
  editProfile,
} from '../profileAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
describe('profile action', () => {
  localStorage.setItem('haven', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoibm9ub2p1IiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzMwMTcsImV4cCI6MTU2NzYxOTQxN30.YYgbnLLX0hRzxSpSPLR5wj04lzJnTjUKBZlRh_-T9CI');

  it('success', () => {
    const expectedAction = {
      type: 'GET_PROFILE_SUCCESS',
      payload: {
        id: 1,
        email: 'nonso@mail.com',
      },
    };
    expect(getProfileSuccess(expectedAction.payload)).toEqual(expectedAction);
  });

  it('success', () => {
    const expectedAction = {
      type: 'GET_PROFILE_START',
    };
    expect(getProfileStart()).toEqual(expectedAction);
  });

  it('test', () => {
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
        error: { error: 'invalid token', status: 401 },
      };
      expect(data).toEqual(expectedAction);
    });
  });

  it('test', () => {
    localStorage.setItem('haven', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoibm9ub2p1IiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzMwMTcsImV4cCI6MTU2NzYxOTQxN30.YYgbnLLX0hRzxSpSPLR5wj04lzJnTjUKBZlRh_-T9CI');
    mock.onPut('https://a-haven-staging.herokuapp.com/api/v1/user/').reply(200, {
      user: [{ id: 2, email: 'nonso@mail.com' },
      ],
    });

    const store = mockStore({ });
    return store.dispatch(editProfile()).then((data) => {
      const expectedAction = {
        type: 'EDIT_PROFILE_FAILURE',
        error: { error: 'invalid token', status: 401 },
      };
      expect(data).toEqual(expectedAction);
    });
  });
});
