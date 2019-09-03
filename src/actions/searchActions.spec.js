/* eslint-disable no-unused-vars */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {
  updateArticles,
  updateFilters,
  displayFilters,
  removeFilters,
  getArticles,
  getFilteredArticles,
  updateSearchQuery,
  updatePageNumber,
} from './searchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('actions', () => {
  it('should create create an and add a filter', () => {
    const payload = {
      field: 'categories',
      value: 'lifestyle',
    };

    const expectedAction = {
      type: 'UPDATE_FILTER',
      payload,
    };
    expect(updateFilters(payload)).toEqual(expectedAction);
  });

  it('should create an action to add hide / show filters', () => {
    const payload = {
      payload: 'categories',
    };

    const expectedAction = {
      type: 'DISPLAY_FILTER',
      payload,
    };

    expect(displayFilters(payload)).toEqual(expectedAction);
  });

  it('should create an action to remove filters', () => {
    const payload = {
      field: 'categories',
      value: 'heath',
    };

    const expectedAction = {
      type: 'REMOVE_FILTER',
      payload,
    };

    expect(removeFilters(payload)).toEqual(expectedAction);
  });

  it('should create an action to update articles', () => {
    const payload = [{ a: 'b' }, { c: 'd' }];

    const expectedAction = {
      type: 'UPDATE_ARTICLES',
      payload,
    };

    expect(updateArticles(payload)).toEqual(expectedAction);
  });

  it('should create an action to update search query', () => {
    const payload = 'Mon';

    const expectedAction = {
      type: 'UPDATE_SEARCHQUERY',
      payload,
    };

    expect(updateSearchQuery(payload)).toEqual(expectedAction);
  });

  it('should create an action to update page number', () => {
    const payload = 2;

    const expectedAction = {
      type: 'UPDATE_PAGENUMBER',
      payload,
    };

    expect(updatePageNumber(payload)).toEqual(expectedAction);
  });
});

describe('get articles actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      filters: {
        searchQuery: '',
        page: 1,
        displayFields: {
          categories: 'show',
          authors: 'show',
          tags: 'show',
        },
        updateFields: {
          categories: [],
          authors: [],
          tags: [],
        },
        searchResults: [],
      },
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('adds new articles to the store', () => {
    nock(url)
      .post('/articles/search/filter?searchQuery=on&limit=200')
      .reply(200, [{ a: 'b' }, { c: 'd' }]);
    return store.dispatch(getFilteredArticles())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('adds new articles to the store', () => {
    nock(url)
      .post('/articles/search/filter?searchQuery=on&limit=200')
      .reply(200, [{ a: 'b' }, { c: 'd' }]);
    return store.dispatch(getArticles())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
