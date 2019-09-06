import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAttribute } from '@Utils/';
import { Banner } from './Banner';

const setUp = (props) => shallow(<Banner {...props} />);

describe('Banner component test', () => {
  let wrapper;
  describe('Pass in props', () => {
    beforeEach(() => {
      const props = {
        signUp: () => true,
      };
      wrapper = setUp(props);
    });
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'bannerComponent');
      expect(component.length).toBe(1);
    });

    it('Should test the onClick method', () => {
      const value = wrapper.find('Button').dive().find('button').props()
        .onClick();
      expect(value).toBe(true);
    });
  });
});
