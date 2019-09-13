import * as actions from '../imageAction';
import { POST_IMAGE_FAILURE, POST_IMAGE_START } from '../types';

jest.mock('../imageFunc');

describe('Async action creators', () => {
  it('should dispatch post image action', async () => {
    const image = {
      image: 'image.png',
    };
    const dispatch = jest.fn();
    await actions.postImage(image)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should dispatch start action on image post', async () => {
    const image = null;
    const dispatch = jest.fn();
    await actions.postImage(image)(dispatch);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: POST_IMAGE_START,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: POST_IMAGE_FAILURE,
      error: {
        error: 'Authorization error',
        status: 401,
      },
    });
  });
});
