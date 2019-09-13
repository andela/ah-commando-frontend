import { GET_ARTICLES_WITH_TAG } from '@Actions/types';
import tagReducer, { initState } from './tagReducer';

describe('tag reducer test', () => {
  it('should return initial state', () => {
    expect(tagReducer(undefined, {})).toEqual(initState);
  });

  it('should return new state', () => {
    expect(tagReducer(initState, {
      type: GET_ARTICLES_WITH_TAG,
      payload: [{}],
      suppliedTag: 'travel',
    })).toMatchSnapshot();
  });
});
