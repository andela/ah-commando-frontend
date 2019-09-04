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

  it('Get profile: Should return error state for an error', () => {
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
      type: types.EDIT_PROFILE_START,
    });
    expect(newState).toEqual({
      user: null,
      error: null,
    });
  });

  it('Edit profile: Should fail', () => {
    const newState = profileReducer(null, {
      type: types.EDIT_PROFILE_FAILURE,
    });
    expect(newState).toEqual({});
  });
});
