import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Notice from './Notice';

const Overlay = PopType => {
  class Inner extends Component {
    clickOutside = e => {
      if (e.target.contains(this.innerRef)) {
        this.props.toggleIsPop();
        console.log('點到 Overlay，關掉 PopUp');
      } else {
        console.log('點到 Notice');
      }
    };

    render() {
      const { isPop } = this.props;
      return (
        <div>
          {isPop && (
            <button
              type='button'
              className='overlay'
              ref={node => {
                this.innerRef = node;
              }}
              onClick={this.clickOutside}
            >
              <PopType {...this.props} />
            </button>
          )}
        </div>
      );
    }
  }

  Inner.propTypes = {
    isPop: PropTypes.bool.isRequired,
    toggleIsPop: PropTypes.func.isRequired,
  };
  return Inner;
};

const Popup = Overlay(Notice);

export default Popup;
