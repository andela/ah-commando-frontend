import * as types from '@Actions/types';
import categoryReducer from './categoriesReducer';

const initialState = {
  clickedCategory: '',
  selectedIndex: 0,
};

describe('Search Reducer', () => {
  it('should return default state', () => {
    expect(categoryReducer(undefined, {})).toEqual(initialState);
  });

  it('should return new state', () => {
    const payload = {
      category: 'technology',
      Articles: [{}],
    };
    const action = {
      type: types.UPDATE_CATEGORY_ARTICLES,
      payload,
    };

    const newState = {
      clickedCategory: '',
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
      selectedIndex: 1,
    };

    expect(categoryReducer(initialState, action)).toEqual(nextState);
  });
});
