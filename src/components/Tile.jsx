import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ text, clickTile }) => (
  <button type='button' className={`tile-${text}`} onClick={clickTile} value={text}>
    {text === '9' ? <p className='gap'>{text}</p> : <p>{text}</p>}
  </button>
);

Tile.defaultProps = {
  text: null,
};

Tile.propTypes = {
  text: PropTypes.string,
  clickTile: PropTypes.func.isRequired,
};

export default Tile;
