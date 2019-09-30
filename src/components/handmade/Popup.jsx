import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Notice from './Notice';

const Overlay = PopType => {
  class Inner extends Component {
    clickOutside = e => {
      const { toggleIsPop } = this.props;
      if (e.target.contains(this.innerRef)) {
        toggleIsPop();
      }
    };

    render() {
      const { isPop, clickOutside } = this.props;
      return (
        <div>
          {isPop && (
            <div
              role='button'
              tabIndex='0'
              className='overlay'
              ref={node => {
                this.innerRef = node;
              }}
              onClick={clickOutside ? this.clickOutside : null}
              onKeyUp={null}
            >
              <PopType {...this.props} />
            </div>
          )}
        </div>
      );
    }
  }

  Inner.defaultProps = {
    clickOutside: false,
  };

  Inner.propTypes = {
    isPop: PropTypes.bool.isRequired,
    toggleIsPop: PropTypes.func.isRequired,
    clickOutside: PropTypes.bool,
  };
  return Inner;
};

const Popup = Overlay(Notice);

export default Popup;
