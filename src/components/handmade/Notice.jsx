import React from 'react';
import PropTypes from 'prop-types';

const Notice = ({ noticeMsg }) => (
  <div className='modal notice'>
    <p>{noticeMsg}</p>
    <button type='button'>OK</button>
  </div>
);

Notice.defaultProps = {
  noticeMsg: '請先輸入名字才可以開始玩唷！',
};

Notice.propTypes = {
  noticeMsg: PropTypes.string,
};

export default Notice;
