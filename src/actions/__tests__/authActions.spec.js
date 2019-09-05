import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  logIn,
  createUser,
} from '@Actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('Auth action tests', () => {
  describe('Auth Action tests return values', () => {
    const userData = {
      firstname: 'john',
      lastname: 'doe',
      username: 'johndoe1_',
      email: 'johun.doe@gmail.com',
      password: 'password1$',
    };

    const history = {
      push: jest.fn(),
    };

    it('signin should return expected values', () => {
      expect(logIn(userData, history)).toMatchSnapshot();
    });

    it('signup should return expected values', () => {
      expect(createUser(userData, history)).toMatchSnapshot();
    });
  });

  describe('Sign in actions', () => {
    let store;
    const response = {
      user: {
        id: 1,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrY215a2FpcmxAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiS2VsZWNoaSIsImxhc3ROYW1lIjoiTmd3b2JpYSIsInR5cGUiOiJjbGllbnQiLCJpc0FkbWluIjpudWxsLCJpYXQiOjE1NjY3NjgzMDIsImV4cCI6MTU2Njg1NDcwMn0.tbi_p7QnWb524thZ6uao7ILrxt0Vya_JCec1skuoGjE',
      },
    };

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('signs in a user successfully', () => {
      nock(url)
        .post('/users/login')
        .reply(200, response);

      return store.dispatch(logIn({}, { push: jest.fn() }))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('should error as expected', () => {
      const errorResponse = {
        err: {
          response: {
            data: {},
          },
        },
      };
      nock(url)
        .post('/users/login')
        .reply(400, errorResponse.err);

      return store.dispatch(logIn({}, { push: jest.fn() }))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('Sign up actions', () => {
    let store;
    const response = {
      user: {
        id: 1,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrY215a2FpcmxAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiS2VsZWNoaSIsImxhc3ROYW1lIjoiTmd3b2JpYSIsInR5cGUiOiJjbGllbnQiLCJpc0FkbWluIjpudWxsLCJpYXQiOjE1NjY3NjgzMDIsImV4cCI6MTU2Njg1NDcwMn0.tbi_p7QnWb524thZ6uao7ILrxt0Vya_JCec1skuoGjE',
      },
    };

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('registers a user successfully', () => {
      nock(url)
        .post('/users')
        .reply(201, response);
      return store.dispatch(createUser({}, { push: jest.fn() }))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('should error as expected', () => {
      const errorResponse = {
        err: {
          response: {
            data: {},
          },
        },
      };
      nock(url)
        .post('/users')
        .reply(400, errorResponse.err);

      return store.dispatch(createUser({}, { push: jest.fn() }))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });
});
