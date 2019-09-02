import React, { Component } from 'react';
import Tile from './Tile';
import Info from './Info';
import Ans from './Ans';

class Gamebox extends Component {
  state = {
    quiz: 'https://source.unsplash.com/900x900/?cat,japan',
    playerName: 'yoooo',
    step: 0,
  };

  render() {
    const { step, playerName, quiz } = this.state;
    return (
      <div className="Gamebox">
        <div className="Gamebox-upper">
          <Info />
          <Info />
          <Ans />
          <p>{step + playerName + quiz}</p>
        </div>
        <div className="Gamebox-down">
          <Tile />
        </div>
      </div>
    );
  }
}

export default Gamebox;
