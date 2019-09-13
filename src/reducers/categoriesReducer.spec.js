import * as types from '@Actions/types';
import categoryReducer from './categoriesReducer';

const initialState = {
  clickedCategory: '',
  page: 1,
  selectedIndex: 0,
};

describe('Search Reducer', () => {
  it('should return default state', () => {
    expect(categoryReducer(undefined, {})).toEqual(initialState);
  });

  it('should return new state', () => {
    const payload = {
      category: 'technology',
      page: 1,
      Articles: [{}],
    };
    const action = {
      type: types.UPDATE_CATEGORY_ARTICLES,
      payload,
    };

    const newState = {
      clickedCategory: '',
      page: 1,
      selectedIndex: 0,
      technology: [{}],
    };

    expect(categoryReducer(initialState, action)).toEqual(newState);
  });

  it('should return new state (display filter)', () => {
    const payload = 'technology';
    const action = {
      type: types.UPDATE_CATEGORY,
      payload,
    };

    const newState = {
      clickedCategory: 'technology',
      page: 1,
      selectedIndex: 0,
    };

    expect(categoryReducer(initialState, action)).toEqual(newState);
  });

  it('should return new state (remove filter)', () => {
    const payload = 1;
    const action = {
      type: types.UPDATE_MENU_ITEM,
      payload,
    };

    const nextState = {
      clickedCategory: '',
      page: 1,
      selectedIndex: 1,
    };

    expect(categoryReducer(initialState, action)).toEqual(nextState);
  });
});
