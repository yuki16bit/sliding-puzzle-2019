import React from 'react';
import PropTypes from 'prop-types';

import Loading from './handmade/Loading';

const Info = ({ playerStep, quiz, changeName, placeholder, blurInput, focusInput, isLock }) => (
  <div className='info'>
    {changeName && (
      <label htmlFor='name'>
        Name:
        <input
          type='text'
          name='name'
          onChange={changeName}
          placeholder={placeholder}
          onBlur={blurInput}
          onFocus={focusInput}
          disabled={isLock}
        />
      </label>
    )}
    {playerStep && (
      <label htmlFor='step'>
        Step:
        <input type='text' name='step' value={playerStep} readOnly />
      </label>
    )}
    {quiz && (
      <div className='quiz' style={{ backgroundImage: `url('${quiz}')` }} />
    )}
    {quiz === '' && (
      <div className='quiz' style={{ backgroundColor: 'white' }}>
        <Loading />
      </div>
    )}
  </div>
);

Info.defaultProps = {
  playerStep: null,
  quiz: null,
  changeName: null,
  blurInput: null,
  focusInput: null,
  placeholder: null,
  isLock: null,
};

Info.propTypes = {
  playerStep: PropTypes.string,
  quiz: PropTypes.string,
  changeName: PropTypes.func,
  placeholder: PropTypes.string,
  blurInput: PropTypes.func,
  focusInput: PropTypes.func,
  isLock: PropTypes.bool,
};

export default Info;
