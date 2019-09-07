import * as types from '@Actions/types';

const initialState = {
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
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FILTER: {
      const { field, value } = action.payload;
      return {
        ...state,
        updateFields: {
          ...state.updateFields,
          [`${field}`]: state.updateFields[`${field}`].concat([value]),
        },
      };
    }

    case types.DISPLAY_FILTER: {
      const value = state.displayFields[`${action.payload}`] === 'hide' ? 'show' : 'hide';
      return {
        ...state,
        displayFields: {
          ...state.displayFields,
          [`${action.payload}`]: value,
        },
      };
    }

    case types.REMOVE_FILTER: {
      const { field, value } = action.payload;
      return {
        ...state,
        updateFields: {
          ...state.updateFields,
          [`${field}`]: state.updateFields[`${field}`].filter((item) => item !== value),
        },
      };
    }

    case types.UPDATE_ARTICLES: {
      const { payload } = action;
      return {
        ...state,
        searchResults: [
          ...payload,
        ],
      };
    }

    case types.UPDATE_SEARCHQUERY: {
      const { payload } = action;
      return {
        ...state,
        searchQuery: payload,
      };
    }

    case types.UPDATE_PAGENUMBER: {
      const { payload } = action;
      return {
        ...state,
        page: payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
