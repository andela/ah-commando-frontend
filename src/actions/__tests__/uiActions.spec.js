import { openModal, closeModal } from '@Actions/uiActions';

describe('UI Action tests', () => {
  const payload = 'signin';
  it('openModal should return MODAL_OPEN type with the right modal as payload', () => {
    expect(openModal(payload)).toMatchSnapshot();
  });

  it('closeModal should return MODAL_CLOSE type', () => {
    expect(closeModal(payload)).toMatchSnapshot();
  });
});
