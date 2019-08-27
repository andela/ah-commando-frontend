import { shallow } from 'enzyme';
import React from 'react';
import findByTestAttribute from '@Utils/index';
import LoginPage from '.';

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
