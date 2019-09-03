import { shallow } from 'enzyme';
import React from 'react';
import findByTestAttribute from '@Utils/';
import { Home } from './';

describe('Article card component test', () => {
  let wrapper, props;
  beforeEach(() => {
    props = {
      signIn: jest.fn(),
    };
    wrapper = shallow(<Home {...props} />);
  });
  describe('Card tests', () => {
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'homepageComponent');
      expect(component.length).toBe(1);
    });
  });
});
