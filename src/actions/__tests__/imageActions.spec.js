import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { postImage } from '@Actions/imageAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('Async action creators', () => {
  let store;
  const response = {
    data: { image: 'image.png' },
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

  it('Should successfully upload an image', async () => {
    nock(url)
      .post('/image')
      .reply(200, response);

    return store.dispatch(postImage({ image: response.data.image }))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('Should error as expected', async () => {
    nock(url)
      .post('/image')
      .reply(400, error);

    return store.dispatch(postImage())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
