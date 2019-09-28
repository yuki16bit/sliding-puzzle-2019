import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import './App.scss';

import Game from './components/Game';
import Ranking from './components/Ranking';

const App = () => (
  <div className='app'>
    <h3>Sliding Cat (Ф∀Ф)</h3>
    <BrowserRouter>
      <div className='nav'>
        <NavLink exact to='/' className='link' activeClassName='link-active'>
          Game
        </NavLink>
        <NavLink to='/ranking' className='link' activeClassName='link-active'>
          Ranking
        </NavLink>
      </div>
      <Route exact path='/' render={() => <Game />} />
      <Route path='/ranking' render={() => <Ranking />} />
    </BrowserRouter>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
