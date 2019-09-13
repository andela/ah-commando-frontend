import * as types from '@Actions/types';
import homePageArticles from '../HomePage';
import notifications from '../notifications';

const homepageInitial = {
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

describe('Reducer tests', () => {
  describe('notifications reducer tests', () => {
    it('Should return default state', () => {
      const newState = notifications(undefined, {});
      expect(newState).toEqual({ notifications: [] });
    });

    it('Should return new state if recieving type', () => {
      const notify = [{ title: 'Test1' }, { title: 'Test1' }, { title: 'Test1' }];
      const newState = notifications(undefined, {
        type: types.FETCH_NOTIFICATIONS,
        payload: notify,
      });
      expect(newState).toEqual({ notifications: notify });
    });
  });

  describe('Artcles reducer test', () => {
    it('Should return default state', () => {
      const newState = homePageArticles(undefined, {});
      expect(newState).toEqual(homepageInitial);
    });

    it('Should return new state if recieving type for article categories', () => {
      const payload = {};
      const homepage = [{ title: 'Test1' }, { title: 'Test1' }, { title: 'Test1' }];
      payload.Categories = homepage;
      const newState = homePageArticles(undefined, {
        type: 'GET_HOME_ARTICLES_FROM_DATABASE',
        payload,
      });
      expect(newState.articleCategories).toEqual(homepage);
    });

    it('Should return new state if recieving type for featured articles', () => {
      const payload = {};
      const homepage = [{ title: 'Test1' }, { title: 'Test1' }, { title: 'Test1' }];
      payload.article = homepage;
      const newState = homePageArticles(undefined, {
        type: 'GET_FEATURED',
        payload,
      });
      expect(newState.featuredArticle).toEqual(homepage);
    });

    it('Should return new state if recieving type for editors choice', () => {
      const payload = {};
      const homepage = [{ title: 'Test1' }, { title: 'Test1' }, { title: 'Test1' }];
      payload.articles = homepage;
      const newState = homePageArticles(undefined, {
        type: 'GET_EDITORS_CHOICE',
        payload,
      });
      expect(newState.editorsChoice).toEqual(homepage);
    });
  });
});
