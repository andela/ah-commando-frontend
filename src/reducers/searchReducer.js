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
    case 'UPDATE_FILTER': {
      const { field, value } = action.payload;
      return {
        ...state,
        updateFields: {
          ...state.updateFields,
          [`${field}`]: state.updateFields[`${field}`].concat([value]),
        },
      };
    }

    case 'DISPLAY_FILTER': {
      const value = state.displayFields[`${action.payload}`] === 'hide' ? 'show' : 'hide';
      return {
        ...state,
        displayFields: {
          ...state.displayFields,
          [`${action.payload}`]: value,
        },
      };
    }

    case 'REMOVE_FILTER': {
      const { field, value } = action.payload;
      return {
        ...state,
        updateFields: {
          ...state.updateFields,
          [`${field}`]: state.updateFields[`${field}`].filter((item) => item !== value),
        },
      };
    }

    case 'UPDATE_ARTICLES': {
      const { payload } = action;
      return {
        ...state,
        searchResults: [
          ...payload,
        ],
      };
    }

    case 'UPDATE_SEARCHQUERY': {
      const { payload } = action;
      return {
        ...state,
        searchQuery: payload,
      };
    }

    case 'UPDATE_PAGENUMBER': {
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
