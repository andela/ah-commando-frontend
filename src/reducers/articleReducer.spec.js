import * as types from '../actions/types/index';
import articleReducer from './articleReducer';

describe('Article Reducer', () => {
  it('Should return default state', () => {
    const newState = articleReducer(undefined, {});
    expect(newState).toEqual({
      article: null,
      error: null,
    });
  });

  it('Should return new state if receiving type', () => {
    const newState = articleReducer(null, {
      type: types.GET_ARTICLE_START,
    });
    expect(newState).toEqual({});
  });

  it('Should return new state if receiving type', () => {
    const err = {
      error: 'invalid',
    };
    const newState = articleReducer(undefined, {
      type: types.GET_ARTICLE_FAILURE,
      error: err,
    });
    expect(newState).toEqual({
      article: null,
      error: err,
    });
  });
});
