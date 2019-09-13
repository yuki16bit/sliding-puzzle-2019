import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ text, clickTile }) => (
  <button type='button' className='tile' onClick={clickTile}>
    <p>{text}</p>
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
