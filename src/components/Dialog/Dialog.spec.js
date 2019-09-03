import { shallow } from 'enzyme';
import React from 'react';
// import moxios from 'moxios';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
// import localStorage from './__mock__/localStorage';
import findByTestAttribute from '@Utils/';
import Dialog from '.';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const propss = {
  user: null,
  error: null,
};

const store = mockStore({
  profile: {
    user: {},
    error: null,
  },
});

const setUp = () => shallow(<Provider store={store}><Dialog {...propss} /></Provider>);

describe('Profile component test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  describe('Card tests', () => {
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper);
      expect(component).toBeTruthy();
    });
  });
});
