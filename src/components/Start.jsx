import React from 'react';
import PropTypes from 'prop-types';

const Start = ({ isStart, clickStart }) => (
  <div className='start'>
    <button type='button' className='start-btn' onClick={clickStart}>
      {isStart ? 'ReStart!' : 'Start!'}
    </button>
  </div>
);

Start.propTypes = {
  isStart: PropTypes.bool.isRequired,
  clickStart: PropTypes.func.isRequired,
};

export default Start;
