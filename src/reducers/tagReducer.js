export const initState = {
  articles: [],
  suppliedTag: '',
};

const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES_WITH_TAG':
      return {
        ...state,
        articles: action.payload,
        suppliedTag: action.tag,
      };
    default:
      return state;
  }
};

export default tagReducer;
