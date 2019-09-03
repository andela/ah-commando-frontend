import * as types from '../actions/types/index';
import profileReducer from './profileReducer';

describe('Profile Reducer', () => {
  it('Get profile: Should return default state', () => {
    const newState = profileReducer(undefined, {});
    expect(newState).toEqual({ error: null, user: null });
  });

  it('Get profile: Should return new state if receiving type', () => {
    const newState = profileReducer(null, {
      type: types.GET_PROFILE_START,
    });
    expect(newState).toEqual({});
  });

  // it('Should return new state if receiving type', () => {
  //   const user = {
  //     id: 9,
  //     username: 'chanonsohgutyyy',
  //     firstname: 'calix',
  //     lastname: 'chi',
  //     email: 'debchissdddf@gmail.com',
  //     bio: 'ddddd',
  //     image: 'http://res.cloudinary.com/dutbqk0ux/image/upload/v1567457350/y3hzcmwnhh93b2ykuszq.png',
  //     followers: [],
  //     followings: [],
  //     followerCount: 0,
  //     followingCount: 0,
  //     following: false,
  //   };
  //   const newState = profileReducer(undefined, {
  //     type: types.GET_ARTICLE_SUCCESS,
  //   });
  //   expect(newState).toEqual({});
  // });

  it('Get profile: Should return new state if receiving type', () => {
    const err = {
      error: 'invalid',
    };
    const newState = profileReducer(undefined, {
      type: types.GET_PROFILE_FAILURE,
      error: err,
    });
    expect(newState).toEqual({
      user: null,
      error: err,
    });
  });

  it('Edit profile: Should return new state if receiving type', () => {
    const newState = profileReducer(undefined, {
      type: types.EDIT_ARTICLE_START,
    });
    expect(newState).toEqual({
      user: null,
      error: null,
    });
  });

  it('Edit profile: Should fail', () => {
    const newState = profileReducer(null, {
      type: types.EDIT_ARTICLE_FAILURE,
    });
    expect(newState).toEqual({});
  });
});
