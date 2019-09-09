import React from 'react';
import PropTypes from 'prop-types';

const Notice = ({ noticeMsg }) => (
  <div className="notice">
    <p>{noticeMsg}</p>
  </div>
);

Notice.defaultProps = {
  noticeMsg: '請先輸入名字才可以開始玩唷！',
};

Notice.propTypes = {
  noticeMsg: PropTypes.string,
};

export default Notice;
