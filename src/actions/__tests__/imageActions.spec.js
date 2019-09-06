import * as actions from '../imageAction';
import { POST_IMAGE_FAILURE, POST_IMAGE_START } from '../types';

jest.mock('../imageFunc');

describe('Async action creators', () => {
  it('Should create SIGN_IN_USER_SUCCEEDED when signIn user has been done', async () => {
    const image = {
      image: 'image.png',
    };
    const dispatch = jest.fn();
    await actions.postImage(image)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('Should create SIGN_IN_USER_SUCCEEDED when signIn user has been done', async () => {
    const image = null;
    const dispatch = jest.fn();
    await actions.postImage(image)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: POST_IMAGE_START,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: POST_IMAGE_FAILURE,
      error: {
        error: 'invalid token',
        status: 401,
      },
    });
  });
});
