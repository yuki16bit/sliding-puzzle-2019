import React from 'react';
import PropTypes from 'prop-types';

const Start = ({onStartClick}) => (
  <div className="start">
    <button type="button" className="start-btn" onClick={onStartClick}>Start!</button>
  </div>
);

Start.propTypes = {
  // list: PropTypes.array.isRequired,
  onStartClick: PropTypes.func.isRequired,
};

export default Start;
