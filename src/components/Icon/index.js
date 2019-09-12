/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */

import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp as likes,
  faThumbsDown as dislikes,
  faComment as comments,
  faBookmark as bookmark,
  faBell as notification,
} from '@fortawesome/free-regular-svg-icons';

import {
  faSearch as search,
  faChevronLeft as left_arrow,
  faChevronRight as right_arrow,
  faChevronUp as up_arrow,
  faChevronDown as down_arrow,
  faTimes as close,
  faTrash as trash,
  faCamera as camera,
  faAngleRight as angleRight,
  faAngleLeft as angleLeft,
  faAngleUp as angleTop,
  faAngleDown as angleBottom,
  faEllipsisH as options,
  faThumbsUp as boldLikes,
  faThumbsDown as boldDislikes,
} from '@fortawesome/free-solid-svg-icons';

import './Icon.scss';

const icons = {
  boldLikes,
  boldDislikes,
  likes,
  dislikes,
  comments,
  bookmark,
  notification,
  search,
  left_arrow,
  right_arrow,
  up_arrow,
  down_arrow,
  close,
  trash,
  camera,
  angleRight,
  angleLeft,
  angleTop,
  angleBottom,
  options,
};
const Icon = (props, ref) => {
  const { name, handleClick, style } = props;
  /* istanbul ignore next */
  return (
    <div onClick={() => handleClick()} className="icon-container" style={style} name={name}>
      <FontAwesomeIcon
        className="icon"
        icon={icons[name]}
      />
    </div>
  );
};

Icon.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.string,
  style: PropTypes.shape(PropTypes.object),
};

Icon.defaultProps = {
  handleClick: () => { },
  name: '',
  style: {},
};

export default Icon;
