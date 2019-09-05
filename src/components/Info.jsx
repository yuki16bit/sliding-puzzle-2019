import React from 'react';
import PropTypes from 'prop-types';

const Info = ({step}) => (
  <div>
    <p>{step}</p>
    <input />
  </div>
);

Info.defaultProps = {
  step: null,
}

Info.propTypes = {
  step: PropTypes.number,
};

export default Info;
