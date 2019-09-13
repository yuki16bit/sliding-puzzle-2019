import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ playerName, playerStep, quiz, changeName }) => (
  <div className='info'>
    {changeName && (
      <label htmlFor='name'>
        Name:
        <input type='text' name='name' placeholder={playerName} onChange={changeName} />
      </label>
    )}
    {playerStep && (
      <label htmlFor='step'>
        Step:
        <input type='text' name='step' value={playerStep} readOnly />
      </label>
    )}
    {quiz && (
      <div className='info-quiz'>
        <img src={quiz} alt='' />
      </div>
    )}
  </div>
);

Info.defaultProps = {
  playerName: null,
  playerStep: null,
  quiz: null,
  changeName: null,
};

Info.propTypes = {
  playerName: PropTypes.string,
  playerStep: PropTypes.string,
  quiz: PropTypes.string,
  changeName: PropTypes.func,
};

export default Info;
