import React from 'react';
import PropTypes from 'prop-types';

import Loading from './handmade/Loading';

const Tiles = ({ tilesList, clickTile, quiz }) => (
  <div className='tiles'>
    {quiz !== '' ? (
      tilesList.map((tile, i) => {
        const text = tile.toString();
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
        );
      })
    ) : (
      <Loading />
    )}
  </div>
);

Tiles.defaultProps = {
  quiz: null,
};

Tiles.propTypes = {
  tilesList: PropTypes.instanceOf(Array).isRequired,
  clickTile: PropTypes.func.isRequired,
  quiz: PropTypes.string,
};

export default Tiles;
