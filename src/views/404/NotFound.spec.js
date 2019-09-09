import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import NotFound from './';

chai.should();

describe('<NotFound /> Component', () => {
  it('Should render without crashing', () => {
    shallow(<NotFound />);
  });
});
