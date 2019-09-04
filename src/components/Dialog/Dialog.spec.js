import React from 'react';
import { shallow } from 'enzyme';
import Dialog from './index';


describe('', () => {
  it('', () => {
    const props = {
      children: 'children',
    };
    const component = shallow(<Dialog {...props} />);
    expect(component.length).toBe(1);
  });
});
