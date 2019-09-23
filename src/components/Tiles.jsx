import React from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';

const Tiles = ({ boxesList, clickTile, quiz }) => (
  <div className='tiles'>
    {boxesList.map((m, i) => {
      return <Tile key={i} text={m.toString()} clickTile={clickTile} quiz={quiz} />;
    })}
  </div>
);

Tiles.propTypes = {
  boxesList: PropTypes.instanceOf(Array).isRequired,
  clickTile: PropTypes.func.isRequired,
  quiz: PropTypes.string.isRequired,
};

export default Tiles;
