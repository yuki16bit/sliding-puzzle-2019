import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ text, onTileClick }) => (
  <button type="button" className="Tile" onClick={onTileClick}>
    <p>{text}</p>
  </button>
);

Tile.propTypes = {
  text: PropTypes.string.isRequired,
  onTileClick: PropTypes.func.isRequired,
};

export default Tile;
