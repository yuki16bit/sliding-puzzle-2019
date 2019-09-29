import React from 'react';
import PropTypes from 'prop-types';

const Notice = ({ noticeMsg }) => (
  <div className='modal notice'>
    <p>{noticeMsg}</p>
  </div>
);

Notice.defaultProps = {
  noticeMsg: 'Please enter your name to start the game.',
};

Notice.propTypes = {
  noticeMsg: PropTypes.string,
};

export default Notice;
