import moxios from 'moxios';
import { makeMockStore } from '@Utils/index';
import {
  unFollowUser,
  unfollowUserSuccess,
  unfollowUserFailure,
  unfollowUserStart,
} from '../unfollowActions';

const store = makeMockStore({});


describe('testing redux actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should follow a user', async () => {
    const res = await store.dispatch(unfollowUserStart());
    expect(res.type).toEqual('UNFOLLOW_USER_START');
  });

  it('should follow a user', async () => {
    const res = await store.dispatch(unfollowUserSuccess());
    expect(res.type).toEqual('UNFOLLOW_USER_SUCCESS');
  });

  it('should follow a user', async () => {
    const res = await store.dispatch(unfollowUserFailure());
    expect(res.type).toEqual('UNFOLLOW_USER_FAILURE');
  });

  it('should follow a user', async () => {
    const res = await store.dispatch(unFollowUser());
    expect(res.type).toEqual('UNFOLLOW_USER_FAILURE');
  });
  it('should follow a user', async () => {
    const res = await store.getActions();
    expect(res[1].type).toEqual('UNFOLLOW_USER_SUCCESS');
    expect(res[1].payload).toEqual(undefined);
  });
});
