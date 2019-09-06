const initState = {
  articleCategories: [],
  featuredArticle: {
    title: '',
    description: 'Molestiae recusandae ut voluptates voluptate necessitatibus eos molestias.',
    readTime: 0,
    image: '',
    likesCount: 0,
    dislikesCount: 0,
  },
  editorsChoice: {
    data: [
      {
        author: {
          firstname: '', lastname: '', username: '', image: null, email: '',
        },
        comment: [],
        description: '',
        dislikesCount: 0,
        favoriteCounts: 0,
        image: '',
        likesCount: 0,
        readCount: 0,
        readTime: 0,
        title: '',
      },
    ],
  },
};

const Homepage = (state = initState, action) => {
  switch (action.type) {
    case 'GET_HOME_ARTICLES_FROM_DATABASE':
      return {
        ...state,
        articleCategories: action.payload.Categories,
      };
    case 'GET_FEATURED':
      return {
        ...state,
        featuredArticle: action.payload.article,
      };
    case 'GET_EDITORS_CHOICE':
      return {
        ...state,
        editorsChoice: action.payload.articles,
      };
    default:
      return state;
  }
};

export default Homepage;
