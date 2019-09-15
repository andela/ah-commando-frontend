import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  followUser,
} from '@Actions/followActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('testing redux actions', () => {
  let store;
  const response = {
    data: {
      profile: {},
    },
  };

  const error = {
    response: {
      data: {},
    },
  };
  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Should follow a user successfully', async () => {
    const username = 'martins';

    return store.dispatch(followUser(username))
      .then(() => {
        nock(url)
          .post(`/profiles/${username}/follow`)
          .reply(200, response);
      })
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('Should error as expected', async () => {
    const username = 'martins';

    return store.dispatch(followUser(username))
      .then(() => {
        nock(url)
          .post(`/profiles/${username}/follow`)
          .reply(400, error);
      })
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
