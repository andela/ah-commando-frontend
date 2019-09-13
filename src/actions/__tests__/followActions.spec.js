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
  it('should dispatch start action', async () => {
    const res = await store.dispatch(followUserStart());
    expect(res.type).toEqual('FOLLOW_USER_START');
  });

  it('should dispatch success action', async () => {
    const res = await store.dispatch(followUserSuccess());
    expect(res.type).toEqual('FOLLOW_USER_SUCCESS');
  });

  it('should dispatch failure action', async () => {
    const res = await store.dispatch(followUserFailure());
    expect(res.type).toEqual('FOLLOW_USER_FAILURE');
  });

  it('should dispatch failure action', async () => {
    const res = await store.dispatch(followUser());
    expect(res.type).toEqual('FOLLOW_USER_FAILURE');
  });
  it('should dispatch success action', async () => {
    const res = await store.getActions();
    expect(res[1].type).toEqual('FOLLOW_USER_SUCCESS');
    expect(res[1].payload).toEqual(undefined);
  });
});
