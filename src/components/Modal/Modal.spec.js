import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import Modal from '@Components/Modal/';

chai.should();

describe('<Modal /> Component', () => {
  let wrapper, props, button, displayStyle;

  beforeEach(() => {
    props = {
      open: true,
      close: jest.fn(),
      children: <h1>Test Child</h1>,
    };
    wrapper = shallow(<Modal {...props} />);
    button = wrapper.find('button');
    displayStyle = wrapper.props().style.display;
  });

  it('Renders as expected', () => {
    button.text().should.equal('X');
    displayStyle.should.equal('flex');
    wrapper.containsMatchingElement(props.children).should.equal(true);
  });

  it('Closes when X button is clicked', () => {
    button.simulate('click');
    expect(props.close).toHaveBeenCalled();
  });

  it('Should not display when open prop is false', () => {
    const newProps = {
      open: false,
      children: <h1>Test Child</h1>,
      close: jest.fn(),
    };
    const newWrapper = shallow(<Modal {...newProps} />);
    newWrapper.props().style.display.should.equal('none');
  });
});
