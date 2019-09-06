import React, { Component } from 'react';

import Info from './Info';
import Tiles from './Tiles';
import Start from './Start';

class Game extends Component {
  state = {
    isStart: false,
    quiz: 'https://source.unsplash.com/900x900/?cat,japan',
    player: {
      name: '123',
      step: '0',
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
    // step ++
    // 檢查是否和挖空相鄰（用矩陣），相鄰代表可移動
    // 如可移動，就 Target 跟 挖空 換位
    // cue 換位動畫（動畫時其他地方鎖起來以防 User 連續亂按）
    // 不可移動，就何も起こらない
    // 檢查是否破關
    console.log('Tile Clicked!')
  }

  checkSolved () {
    // 如果破關，cue 破關動畫（動畫時其他地方鎖起來以防 User 連續亂按）
    // isStart 變回 false，ReStart 變回 Start
    // 沒破關，何も起こらない

  }

  onStartClick () {
    // 檢查有無名字，有才能玩，沒有要跳 Popup 提醒
    // isStart 變 true，Start 要變 ReStart，遊戲進行中不可亂改名，所以 input 鎖起來
    // 出新題目 + shuffle 磁磚們
    console.log('Start Clicked!')
  }

  shuffle () {
    // 先洗牌（用 List）
    // 檢查 inversion 是基數還偶數（基數會破不了關，偶數才能破關）
    // 如果基數，List 前兩個人再換位，讓 inversion 變偶數
    // 重算矩陣
    console.log('Tiles Shuffle!')
  }

  render() {
    const { player, boxes, quiz } = this.state;
    return (
      <div className="game">
        <div className="game-info">
          <Info name={player.name}/>
          <Info step={player.step}/>
          <Info quiz={quiz}/>
        </div>
        <Tiles
          list={boxes.list}
          onTileClick={this.onTileClick}
        />
        <Start onStartClick={this.onStartClick}/>
      </div>
    );
  }
}

export default Game;
