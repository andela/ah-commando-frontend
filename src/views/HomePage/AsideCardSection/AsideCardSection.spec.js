import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttribute } from '@Utils/';
import { ArticleCardSection } from './ArticleCardSection';

const setUp = props => shallow(<ArticleCardSection {...props} />);

describe('ArticleCardSection tests', () => {
  let wrapper;

  describe('Tests with props', () => {
    const props = {
      homePageArticles: {
        editorsChoice: {
          data: [{
            id: 1,
            image: 'image.com',
            title: 'title',
            author: {
              firstname: 'author',
              lastname: 'test',
            },
            description: 'the description',
            likesCount: 12,
            dislikesCount: 3,
            comment: [{
              elelemt: 1,
            }],
            readTime: 3,
          }],
        },
      },
    };
    beforeEach(() => {
      wrapper = setUp(props);
    });
    it('Should render without failing', () => {
      const component = findByTestAttribute(wrapper, 'editorsChoice');
      expect(component.length).toBe(1);
    });

    it('should not throw a warning with the correct prop type', () => {
      const error = checkProps(wrapper, wrapper.protypes, props);
      expect(error).toBeUndefined();
    });
  });

  describe('Empty data object', () => {
    it('should render loading div with empty prop objects', () => {
      const emptyProp = {
        homePageArticles: {
          editorsChoice: {
            data: [{
              description: '',
            }],
          },
        },
      };
      const loadingWrapper = setUp(emptyProp);
      const component = findByTestAttribute(loadingWrapper, 'loadingComponent');
      expect(component.length).toBe(1);
    });
  });
});
