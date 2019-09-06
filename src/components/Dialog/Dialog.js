/* eslint-disable react/prop-types */
import React from 'react';
import './Dialog.scss';

const Dialog = (props) => {
  const { children } = props;
  return (
    <div id="myModal" className="modal-profile">
      <div className="modal-content-profile">
        { children }
      </div>
    </div>
  );
};
export default Dialog;
