import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = (props) => {
  const { open, close, children } = props;
  return (
    <div className="modal-overlay" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal">
        <button type="button" className="close" onClick={close}>X</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
