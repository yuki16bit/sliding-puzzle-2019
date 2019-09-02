import React from 'react';
import ReactDOM from 'react-dom';

import './App.scss';

import Gamebox from './components/Gamebox';

const App = () => (
  <div>
    <h3>Hello React!!</h3>
    <Gamebox />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
