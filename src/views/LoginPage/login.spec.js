import { shallow } from 'enzyme';
import React from 'react';
import LoginPage from './index';
import findByTestAttribute from '../../../utils';

const setUp = (props) => shallow(<LoginPage {...props} />);

describe('Article card component test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  describe('Card tests', () => {
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'loginPageComponent');
      expect(component.length).toBe(1);
    });
  });
});
