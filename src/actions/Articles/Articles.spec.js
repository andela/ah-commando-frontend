import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { getHomePageArticles, getArticle, getEditorsChoice } from './';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('Home Page Articles Actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    nock.cleanAll();
  });

  const response = {
    data: [
      {
        title: 'Example title 1',
        body: 'Some test',
      },
      {
        title: 'Example title 2',
        body: 'Some test',
      },
      {
        title: 'Example title 3',
        body: 'Some test',
      },
    ],
  };

  it('Should get the HomePage Articles', () => {
    nock(url)
      .get('/articles/categories/article')
      .reply(200, response);

    return store.dispatch(getHomePageArticles()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('Should get the featured Articles', () => {
    nock(url)
      .get('/articles/categories/article/featured')
      .reply(200, response);

    return store.dispatch(getArticle()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });


  it('Should get the Editors choice Articles', () => {
    nock(url)
      .get('/articles?limit=5')
      .reply(200, response);

    return store.dispatch(getEditorsChoice()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
