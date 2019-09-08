import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Icon from '../../components/Icon';


const displaySelection = (selections, IconClick, filtername) => (
  selections.map((selection, index) => (
    <Selection
      key={index}
      name={selection}
      handleClick={IconClick}
      field={filtername}
    />
  ))
);

const CategorySelection = (props) => {
  const { name, handleChange } = props;
  return (
    <div className="input-checkbox">
      <input type="checkbox" name={name} value={name} onChange={(e) => { handleChange(e, 'categories'); }} />
      <p>{ name }</p>
    </div>
  );
};

CategorySelection.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const FilterContainer = (props) => {
  const {
    filtername, handleClick, display, handleChange, selections, IconClick,
  } = props;
  return (
    <div className={`${filtername}-container`}>
      <div className="filter-header">
        <DropMenu
          handleClick={handleClick}
          header={filtername}
        />
        <h3>
          {
          filtername.charAt(0).toUpperCase() + filtername.slice(1)
          }
        </h3>
      </div>
      <div className={`${filtername} ${display}`}>
        <div className="author-names">
          {displaySelection(selections, IconClick, filtername)}
        </div>
        <div className={`${filtername}-input`}>
          <input type="text" placeholder={`Enter ${filtername} name`} onKeyUp={(e) => { handleChange(e, filtername); }} />
        </div>
      </div>
    </div>
  );
};

FilterContainer.propTypes = {
  filtername: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selections: PropTypes.arrayOf(PropTypes.string).isRequired,
  IconClick: PropTypes.func.isRequired,
};

const Selection = (props) => {
  const { name, handleClick, field } = props;
  return (
    <div className="selection-container">
      <p>{name}</p>
      <div onClick={() => handleClick(field, name)}>
        <Icon
          name="close"
          className="icon"
        />
      </div>
    </div>
  );
};

Selection.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
};

const DropMenu = (props) => {
  const { handleClick, header } = props;

  const [orientation, setOrientation] = useState('down');

  const toggleOrientation = () => {
    if (orientation === 'right') {
      setOrientation('down');
      handleClick(header);
    } else {
      setOrientation('right');
      handleClick(header);
    }
  };
  return (
    <div onClick={() => { toggleOrientation(); }} className={`drop-container ${orientation}`}>
      <Icon name="right_arrow" />
    </div>
  );
};

DropMenu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default {
  CategorySelection,
  FilterContainer,
  DropMenu,
  Selection,
};
