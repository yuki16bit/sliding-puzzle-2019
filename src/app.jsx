import React from 'react';
import ReactDOM from 'react-dom';

import './App.scss';

import Game from './components/Game';

const App = () => (
  <div>
    <h3>Hello React!!</h3>
    <Game />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
