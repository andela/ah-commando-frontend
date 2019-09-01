import { shallow } from 'enzyme';
import React from 'react';
import findByTestAttribute from '@Utils/';
import { Home } from './';

const setUp = props => shallow(<Home {...props} />);

describe('Article card component test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  describe('Card tests', () => {
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'homepageComponent');
      expect(component.length).toBe(1);
    });
  });
});
