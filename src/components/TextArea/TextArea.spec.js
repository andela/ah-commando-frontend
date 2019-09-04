import React from 'react';
import { shallow } from 'enzyme';
import TextArea from './TextArea';


describe('', () => {
  it('', () => {
    const props = {
      name: 'test',
      value: 'value',
      type: 'type',
      label: 'label',
      error: 'error',
      handleChange: jest.fn(),
    };
    const component = shallow(<TextArea {...props} />);
    expect(component.find('.textarea-container').length).toBe(1);
    expect(component.length).toBe(1);
  });
});
