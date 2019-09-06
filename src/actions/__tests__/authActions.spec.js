import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  createUser,
  logIn, requestPasswordLink, setNewPassword,
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

    const data = {
      password: 'DenJohn@123',
      id: 1,
      token: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrY215a2FpcmxAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiS2VsZWNoaSIsImxhc3ROYW1lIjoiTmd3b2JpYSIsInR5cGUiOiJjbGllbnQiLCJpc0FkbWluIjpudWxsLCJpYXQiOjE1NjY3NjgzMDIsImV4cCI6MTU2Njg1NDcwMn0.tbi_p7QnWb524thZ6uao7ILrxt0Vya_JCec1skuoGjE',
    };

    const email = 'john.doe@gmail.com';

    const history = {
      push: jest.fn(),
    };

    it('signin should return expected values', () => {
      expect(logIn(userData, history)).toMatchSnapshot();
    });

    it('signup should return expected values', () => {
      expect(createUser(userData, history)).toMatchSnapshot();
    });
    it('request-password-link should return expected values', () => {
      expect(requestPasswordLink(email)).toMatchSnapshot();
    });

    it('setNewPassword should return expected values', () => {
      expect(setNewPassword(data, history)).toMatchSnapshot();
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

  describe('Async password request action test', () => {
    let store;
    const response = {
      message: 'Hi John, a password reset link has been sent to your email',
    };

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('send password link successfully', () => {
      nock(url)
        .post('/users/passwordReset')
        .reply(200, response);

      return store.dispatch(requestPasswordLink({}))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('should throw error as expected', () => {
      const errorResponse = {
        err: {
          response: {},
        },
      };
      nock(url)
        .post('/users/passwordReset')
        .reply(400, errorResponse.err);

      return store.dispatch(requestPasswordLink({}))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  //   describe('Async password reset action test', () => {
  //     let store;
  //     const response = {
  //       data: {
  //         message: 'Success, Password Reset Successfully',
  //       },
  //     };

  //     const data = {
  //       password: 'DenJohn@123',
  //       id: 2,
  //       token: 'abcd',
  //     };

  //     const { id, token } = data;

  //     beforeEach(() => {
  //       store = mockStore({});
  //     });

  //     afterEach(() => {
  //       nock.cleanAll();
  //     });

  //     it('reset new password', () => {
  //       nock(url)
  //         .put(`users/resetPassword/${id}/${token}`)
  //         .reply(200, response);

  //       return store.dispatch(setNewPassword({}))
  //         .then(() => {
  //           expect(store.getActions()).toMatchSnapshot();
  //         });
  //     });

  //     it('should throw error as expected', () => {
  //       const errorResponse = {
  //         err: {
  //           response: {},
  //         },
  //       };
  //       nock(url)
  //         .post(`users/resetPassword/${id}/${token}`)
  //         .reply(400, errorResponse.err);

  //       return store.dispatch(setNewPassword({}, { push: jest.fn() }))
  //         .then(() => {
  //           expect(store.getActions()).toMatchSnapshot();
  //         });
  //     });
  //   });
});
