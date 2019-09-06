import React from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';

const Tiles = ({ list, onTileClick }) => (
  <div className="tiles">
    {list.map((m, i) => {
      let text = i+1;
      return <Tile key={i} text={text.toString()} onTileClick={onTileClick} />;
    })}
  </div>
);

Tiles.propTypes = {
  list: PropTypes.array.isRequired,
  onTileClick: PropTypes.func.isRequired,
};

export default Tiles;
