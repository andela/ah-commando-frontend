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
} from '@fortawesome/free-solid-svg-icons';

const icons = {
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
};
const Icon = (props) => {
  const { name, handleClick } = props;
  /* istanbul ignore next */
  return (
    <div onClick={() => handleClick()} className="icon-container">
      <FontAwesomeIcon className="icon" icon={icons[name]} />
    </div>
  );
};

Icon.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.string,
};

Icon.defaultProps = {
  handleClick: () => {},
  name: '',
};

export default Icon;
