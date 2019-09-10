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

  // it('should return new state (Update artifles)', () => {
  //   const payload = [{ a: 'b' }, { c: 'd' }];
  //   const action = {
  //     type: 'UPDATE_ARTICLES',
  //     payload,
  //   };

  //   const newState = {
  //     searchQuery: '',
  //     page: 1,
  //     displayFields: {
  //       categories: 'show',
  //       authors: 'show',
  //       tags: 'show',
  //     },
  //     updateFields: {
  //       categories: [],
  //       authors: [],
  //       tags: [],
  //     },
  //     searchResults: [{ a: 'b' }, { c: 'd' }],
  //   };

  //   expect(filterReducer(undefined, action)).toEqual(newState);
  // });

  // it('should return new state (search query)', () => {
  //   const payload = 'mon';
  //   const action = {
  //     type: 'UPDATE_SEARCHQUERY',
  //     payload,
  //   };

  //   const newState = {
  //     searchQuery: 'mon',
  //     page: 1,
  //     displayFields: {
  //       categories: 'show',
  //       authors: 'show',
  //       tags: 'show',
  //     },
  //     updateFields: {
  //       categories: [],
  //       authors: [],
  //       tags: [],
  //     },
  //     searchResults: [],
  //   };

  //   expect(filterReducer(undefined, action)).toEqual(newState);
  // });

  // it('should return new state (page)', () => {
  //   const payload = 2;
  //   const action = {
  //     type: 'UPDATE_PAGENUMBER',
  //     payload,
  //   };

  //   const newState = {
  //     searchQuery: '',
  //     page: 2,
  //     displayFields: {
  //       categories: 'show',
  //       authors: 'show',
  //       tags: 'show',
  //     },
  //     updateFields: {
  //       categories: [],
  //       authors: [],
  //       tags: [],
  //     },
  //     searchResults: [],
  //   };

  //   expect(filterReducer(undefined, action)).toEqual(newState);
  // });
});
