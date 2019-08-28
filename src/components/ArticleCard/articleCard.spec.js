import { shallow } from 'enzyme';
import React from 'react';
import findByTestAttribute from '@Utils/';
import ArticleCard from './';

const setUp = props => shallow(<ArticleCard {...props} />);

describe('Article card component test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  describe('Card tests', () => {
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'articleCardComponent');
      expect(component.length).toBe(1);
    });
  });
});
