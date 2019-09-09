import React from 'react';
import PropTypes from 'prop-types';

const Start = ({ isStart, onStartClick }) => (
  <div className="start">
    <button type="button" className="start-btn" onClick={onStartClick}>
      {isStart ? 'ReStart!' : 'Start!'}
    </button>
  </div>
);

Start.propTypes = {
  isStart: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
};

export default Start;
