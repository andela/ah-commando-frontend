import moxios from 'moxios';
import { makeMockStore } from '@Utils/index';
import {
  unFollowUser,
  unfollowUserSuccess,
  unfollowUserFailure,
  unfollowUserStart,
} from '../unfollowActions';

const store = makeMockStore({});


describe('testing redux actions for unfollow user', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch unfollow user start action', async () => {
    const res = await store.dispatch(unfollowUserStart());
    expect(res.type).toEqual('UNFOLLOW_USER_START');
  });

  it('should dispatch unfollow user success action', async () => {
    const res = await store.dispatch(unfollowUserSuccess());
    expect(res.type).toEqual('UNFOLLOW_USER_SUCCESS');
  });

  it('should dispatch unfollow user failure action', async () => {
    const res = await store.dispatch(unfollowUserFailure());
    expect(res.type).toEqual('UNFOLLOW_USER_FAILURE');
  });

  it('should check for types on unfollow user failure', async () => {
    const res = await store.dispatch(unFollowUser());
    expect(res.type).toEqual('UNFOLLOW_USER_FAILURE');
  });
  it('should check for types on unfollow user success', async () => {
    const res = await store.getActions();
    expect(res[1].type).toEqual('UNFOLLOW_USER_SUCCESS');
    expect(res[1].payload).toEqual(undefined);
  });
});
