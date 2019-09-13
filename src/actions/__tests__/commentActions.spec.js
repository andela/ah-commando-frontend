import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { getComment, postComment } from '@Actions/commentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('Comment action tests', () => {
  describe('Get comments async actions', () => {
    let store;
    const response = {
      data: {
        data: {
          comments: [],
        },
      },
    };

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('gets comments succesfully', () => {
      const articleId = 1;
      store.dispatch(getComment(articleId))
        .then(() => {
          nock(url)
            .get(`/comment/${articleId}`)
            .reply(200, response);
        })
        .then(() => {
          expect(store.getActions()).toMatchSnapShot();
        });
    });

    it('Should error as expected', () => {
      const articleId = null;
      const errorResponse = {
        err: {
          response: {
            data: {},
          },
        },
      };
      nock(url)
        .get(`/comment/${articleId}`)
        .reply(400, errorResponse.err);
      store.dispatch(getComment(articleId))
        .then(() => {
          expect(store.getActions()).toMatchSnapShot();
        });
    });
  });

  describe('Create comment action test', () => {
    let store;
    const response = {
      data: {
        data: {
          comments: [],
        },
      },
    };

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('Create a comment successfully', () => {
      const articleId = 2;
      const comment = 'the test comment';
      store.dispatch(postComment(comment, articleId))
        .then(() => {
          nock(url)
            .post(`/comment/${articleId}`, comment)
            .reply(201, response);
        })
        .then(() => {
          expect(store.getActions()).toMatchSnapShot();
        });
    });

    it('Should error as expected', () => {
      const articleId = null;
      const comment = null;
      const errorResponse = {
        err: {
          response: {
            data: {},
          },
        },
      };
      nock(url)
        .post(`/comment/${articleId}`)
        .reply(400, errorResponse.err);
      store.dispatch(postComment(comment, articleId))
        .then(() => {
          expect(store.getActions()).toMatchSnapShot();
        });
    });
  });
});
