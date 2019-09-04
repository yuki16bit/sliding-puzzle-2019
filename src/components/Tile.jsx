import React from 'react';

const Tile = ({ text, onTileClick }) => {
  return(
  <div className="Tile" onClick={onTileClick}>
    <p>{text}</p>
  </div>
  );
}

export default Tile;
