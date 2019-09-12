import * as types from '@Actions/types';

const initialState = {
  clickedCategory: '',
  selectedIndex: 0,
  page: 1,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CATEGORY_ARTICLES: {
      const { category, Articles } = action.payload;
      return {
        ...state,
        [`${category}`]: Articles,
      };
    }

    case types.UPDATE_CATEGORY: {
      const { payload } = action;
      return {
        ...state,
        clickedCategory: payload,
      };
    }

    case types.UPDATE_MENU_ITEM: {
      const { payload } = action;
      return {
        ...state,
        selectedIndex: payload,
      };
    }

    case types.UPDATE_CATEGORY_PAGENUMBER: {
      const { payload } = action;
      return {
        ...state,
        page: payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default categoryReducer;
