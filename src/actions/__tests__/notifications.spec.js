import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  getNotifications, markAsRead, markAllRead, updateSubscription,
} from '../notifications';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = 'https://a-haven-staging.herokuapp.com/api/v1';

describe('Home Page Articles Actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    nock.cleanAll();
  });

  const response = {
    data: [
      {
        title: 'Example title 1',
        body: 'Some test',
      },
      {
        title: 'Example title 2',
        body: 'Some test',
      },
      {
        title: 'Example title 3',
        body: 'Some test',
      },
    ],
  };

  it('Should get all user Notifications', () => {
    nock(url)
      .get('/notifications/')
      .reply(200, response);

    return store.dispatch(getNotifications()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('Should Mark a notification as read', () => {
    nock(url)
      .patch('/notifications/2/read')
      .reply(200, response);

    return store.dispatch(markAsRead(2)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });


  it('Should mark All notifications as read', () => {
    nock(url)
      .patch('/notifications/read')
      .reply(200, response);

    return store.dispatch(markAllRead()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('Should subcribe to email notifications', () => {
    nock(url)
      .patch('/notifications/email/subscribe')
      .reply(200, response);

    return store.dispatch(updateSubscription(true)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('Should unsubscribe from email notifications', () => {
    nock(url)
      .delete('/notifications/email/subscribe')
      .reply(200, response);

    return store.dispatch(updateSubscription(false)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
