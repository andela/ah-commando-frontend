import { shallow } from 'enzyme';
import React from 'react';
import HomePage from './App';
import findByTestAttribute from '../../utils';

const setUp = (props) => shallow(<HomePage {...props} />);

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
