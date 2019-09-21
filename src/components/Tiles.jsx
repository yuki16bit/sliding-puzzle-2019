import React from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';

const Tiles = ({ boxesList, clickTile }) => (
  <div className='tiles'>
    {boxesList.map((m, i) => {
      return <Tile key={i} text={m.toString()} clickTile={clickTile} />;
    })}
  </div>
);

Tiles.propTypes = {
  boxesList: PropTypes.instanceOf(Array).isRequired,
  clickTile: PropTypes.func.isRequired,
};

export default Tiles;
