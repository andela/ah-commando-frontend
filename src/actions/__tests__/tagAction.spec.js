import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { getArticlesWithTagFromDb } from '@Actions/tagAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';


describe('tag action', () => {
  describe('tag action test', () => {
    const tag = {
      articleTag: 'javascript',
    };

    const history = {
      push: jest.fn(),
    };

    it('tagAction should return expected value', () => {
      expect(getArticlesWithTagFromDb(tag, history)).toMatchSnapshot();
    });
  });

  describe('test view articles with tag action', () => {
    let store;
    const response = {
      articles: [],
    };

    beforeEach(() => {
      store = mockStore({});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should display articles with tag', () => {
      nock(url)
        .post('/articles/tag/get-article')
        .reply(200, response);

      return store.dispatch(getArticlesWithTagFromDb({}, { push: jest.fn() }))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });
});
