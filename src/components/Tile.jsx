import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ text, onTileClick }) => (
  <button type="button" className="tile" onClick={onTileClick}>
    <p>{text}</p>
  </button>
);

Tile.defaultProps = {
  text: null,
}

Tile.propTypes = {
  text: PropTypes.string,
  onTileClick: PropTypes.func.isRequired,
};

export default Tile;
