import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './handmade/Loading';

const Tiles = ({ boxesList, clickTile, quiz }) => (
  <div className='tiles'>
    {quiz !== ''
      ? (
        boxesList.map((tile, i) => {
          let text = tile.toString();
          return (
            <button
              key={i}
              type='button'
              className={`tile-${text}`}
              onClick={clickTile}
              value={text}
              style={{ backgroundImage: `url(${quiz})` }}
            >
              {text === '9' ? <p className='gap'>{text}</p> : <p>{text}</p>}
            </button>
          )
        })
      ) : (
        <Loading/>
      )}
  </div>
);

Tiles.defaultProps = {
  quiz: null,
}

Tiles.propTypes = {
  boxesList: PropTypes.instanceOf(Array).isRequired,
  clickTile: PropTypes.func.isRequired,
  quiz: PropTypes.string,
};

export default Tiles;
