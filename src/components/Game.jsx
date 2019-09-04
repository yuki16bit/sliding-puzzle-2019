import React, { Component } from 'react';

import Info from './Info';
import Tiles from './Tiles';

class Game extends Component {
  state = {
    // quiz: 'https://source.unsplash.com/900x900/?cat,japan',
    player: {
      name: "",
      step: 0
    },
    box: {
      row: 3,
      col: 3
    }
  };

  render() {
    const { player, box } = this.state;
    return (
      <div className="Game">
        <div className="Game-info">
          <Info />
          <Info />
          <p>名字、步數 {player.name + player.step}</p>
        </div>
        <Tiles row={box.row} col={box.col}/>
      </div>
    );
  }
}

export default Game;
