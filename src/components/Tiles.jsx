import React, { Component } from 'react';

import Tile from './Tile';

class Tiles extends Component {
  state = { 
    matrix: Array(this.props.row * this.props.col).fill()
  }

  onTileClick = (e) => {
    console.log('Tile Clicked!');
    // 檢查可否移動，可就移然後更新 matrix，不可就沒事
  }

  render() { 
    const { matrix } = this.state;

    return (
      <div>
        {matrix.map((m, i) => {
          return(
            <Tile
              key={i}
              text={i+1}
              onTileClick={this.onTileClick}
            />
          )
        })}
      </div>
    );
  }
}
 
export default Tiles;
