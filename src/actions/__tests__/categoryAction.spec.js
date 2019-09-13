/* eslint-disable no-unused-vars */
import configureMockStore from 'redux-mock-store';
import * as types from '@Actions/types';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  updateArticles,
  updateCategory,
  updateMenuItem,
  getCategoryArticles,
} from '@Actions/categoryActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('actions', () => {
  it('should update articles', () => {
    const payload = {
      category: 'technology',
      Articles: [{}],
    };

    const expectedAction = {
      type: types.UPDATE_CATEGORY_ARTICLES,
      payload,
    };
    expect(updateArticles(payload)).toEqual(expectedAction);
  });

  it('should update the menu item', () => {
    const payload = 1;

    const expectedAction = {
      type: types.UPDATE_MENU_ITEM,
      payload,
    };

    expect(updateMenuItem(payload)).toEqual(expectedAction);
  });

  it('should update the category selected', () => {
    const payload = 'technology';

    const expectedAction = {
      type: types.UPDATE_CATEGORY,
      payload,
    };

    expect(updateCategory(payload)).toEqual(expectedAction);
  });
});

describe('get category actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      clickedCategory: '',
      selectedIndex: 0,
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('adds new articles to the category reducer', () => {
    nock(url)
      .persist()
      .get('/articles/categories/article?category=technology')
      .reply(200, { Categories: [{}] });
    return store.dispatch(getCategoryArticles('technology'))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
