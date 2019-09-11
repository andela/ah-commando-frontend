import moxios from 'moxios';
import { makeMockStore } from '@Utils/index';
import {
  followUser,
  followUserSuccess,
  followUserFailure,
  followUserStart,
} from '../followActions';

const store = makeMockStore({});


describe('testing redux actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should follow a user', async () => {
    const res = await store.dispatch(followUserStart());
    expect(res.type).toEqual('FOLLOW_USER_START');
  });

  it('should follow a user', async () => {
    const res = await store.dispatch(followUserSuccess());
    expect(res.type).toEqual('FOLLOW_USER_SUCCESS');
  });

  it('should follow a user', async () => {
    const res = await store.dispatch(followUserFailure());
    expect(res.type).toEqual('FOLLOW_USER_FAILURE');
  });

  it('should follow a user', async () => {
    const res = await store.dispatch(followUser());
    expect(res.type).toEqual('FOLLOW_USER_FAILURE');
  });
  it('should follow a user', async () => {
    const res = await store.getActions();
    expect(res[1].type).toEqual('FOLLOW_USER_SUCCESS');
    expect(res[1].payload).toEqual(undefined);
  });
});
