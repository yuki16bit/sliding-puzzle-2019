import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notice extends Component {
  // state = {  }

  render() {
    const { noticeMsg } = this.props; 
    return (
      <div className="notice">
        <p>{ noticeMsg }</p>
      </div>
    );
  }
}

Notice.defaultProps = {
  noticeMsg: '請先輸入名字才可以開始玩唷！'
}

Notice.propTypes = {
  noticeMsg: PropTypes.string,
}
 
export default Notice;
