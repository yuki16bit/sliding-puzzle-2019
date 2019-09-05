import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';

class Tiles extends Component {
  state = {
    boxes: Array.from({length: this.props.row * this.props.col}, (v, i) => i+1),
    matrix: [],
  };

  componentDidMount() {
    this.getMatrix(this.state.boxes, this.props.row, this.props.col);
  }

  componentDidUpdate() {
    // 如果 boxes 洗牌或換位，Ｍatrix 重新計算
  }

  getMatrix = (boxes, row, col) => {
    let oneD = [...boxes];
    row = row > 0 ? row : 0;
    let twoD = [];
    while(row-- && oneD.length > 0) {
      let chunk = oneD.splice(0,col)
      twoD.push(chunk);
    }
    this.setState({ matrix: twoD });
  }

  onTileClick = () => {
    console.log('Tile Clicked!');
    // 檢查可否移動，可就移然後更新 matrix，不可就沒事
  };

  render() {
    const { boxes } = this.state;
    return (
      <div>
        {boxes.map((m, i) => {
          let text = i+1;
          return <Tile key={i} text={text.toString()} onTileClick={this.onTileClick} />;
        })}
      </div>
    );
  }
}

Tiles.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default Tiles;
