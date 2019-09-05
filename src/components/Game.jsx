import React, { Component } from 'react';

import Info from './Info';
import Tiles from './Tiles';

class Game extends Component {
  state = {
    // quiz: 'https://source.unsplash.com/900x900/?cat,japan',
    player: {
      name: '',
      step: 0,
    },
    boxes: {
      row: 3,
      col: 3,
      size: 0,
      list: [],
      matrix: []
    },
  };

  componentDidMount() {
    this.getBoxes(this.state.boxes.row, this.state.boxes.col);
  }

  getBoxes(row, col) {
    const size = row * col;
    const list = Array.from({length: size}, (v, i) => i+1);
    
    let oneD = [...list];
    let twoD = [];
    row = row > 0 ? row : 0;
    while(row-- && oneD.length > 0) {
      let chunk = oneD.splice(0,col)
      twoD.push(chunk);
    }

    let newBoxes = {...this.state.boxes};
    newBoxes.size = size;
    newBoxes.list = list;
    newBoxes.matrix = twoD;

    this.setState({ boxes: newBoxes });
  }

  onTileClick () {
    console.log('Tile Clicked!')
  }

  render() {
    const { player, boxes } = this.state;
    return (
      <div className="Game">
        <div className="Game-info">
          <Info />
          <Info step={player.step}/>
          <p>名字、步數 {player.name + player.step}</p>
        </div>
        <Tiles
          list={boxes.list}
          onTileClick={this.onTileClick}
        />
      </div>
    );
  }
}

export default Game;
