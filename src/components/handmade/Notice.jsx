import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

const Notice = ({ noticeMsg, clickOutside }) => (
  <div className='modal notice'>
    <p>{noticeMsg}</p>
    {!clickOutside && <Loading />}
  </div>
);

Notice.defaultProps = {
  clickOutside: false,
};

Notice.propTypes = {
  noticeMsg: PropTypes.string.isRequired,
  clickOutside: PropTypes.bool,
};

export default Notice;
