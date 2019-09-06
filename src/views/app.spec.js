import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAttribute } from '@Utils/';
import App from './App';

const setUp = props => shallow(<App {...props} />);

describe('Article card component test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  describe('Card tests', () => {
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'appComponent');
      expect(component.length).toBe(1);
    });
  });
});
