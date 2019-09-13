import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import Comment from '@Components/Comment';

chai.should();

describe('<Comment /> Component', () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      avatar: 'image.png',
      author: 'author',
      alt: 'author',
      body: 'this is my comment',
      createdAt: 'date',
      likesCount: 34,
      dislikesCount: 30,
    };
    wrapper = shallow(<Comment {...props} />);
  });

  it('Renders as expected', () => {
    expect(wrapper.find('.comment-container')).toHaveLength(1);
  });
});
