import { shallow } from 'enzyme';
import React from 'react';
import ArticleCard from './index';
import findByTestAttribute from '../../../utils';

const setUp = (props) => shallow(<ArticleCard {...props} />);

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
