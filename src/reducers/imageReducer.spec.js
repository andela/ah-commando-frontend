import * as types from '../actions/types/index';
import imageReducer from './imageReducer';

describe('Article Reducer', () => {
  it('Should return default state', () => {
    const newState = imageReducer(undefined, {});
    expect(newState).toEqual({
      image: '',
    });
  });

  it('Should return new state if receiving type', () => {
    const newState = imageReducer(null, {
      type: types.POST_IMAGE_START,
    });
    expect(newState).toEqual({});
  });

  it('Edit profile: Should fail', () => {
    const newState = imageReducer(null, {
      type: types.POST_IMAGE_FAILURE,
    });
    expect(newState).toEqual({});
  });
});
