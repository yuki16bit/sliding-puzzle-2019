import React, { Component } from 'react';

// UI
import Popup from './handmade/Popup';

// Logic
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
      matrix: [],
    },
  };

  componentDidMount() {
    const { boxes } = this.state;
    this.getBoxes(boxes.row, boxes.col);
  }

  getBoxes(row, col) {
    const { boxes } = this.state;
    const size = row * col;
    const list = Array.from({ length: size }, (v, i) => i + 1);

    const oneD = [...list];
    const twoD = [];
    let rowNum = row > 0 ? row : 0;
    while (rowNum && oneD.length > 0) {
      rowNum -= 1;
      const chunk = oneD.splice(0, col);
      twoD.push(chunk);
    }

    const newBoxes = { ...boxes };
    newBoxes.size = size;
    newBoxes.list = list;
    newBoxes.matrix = twoD;

    this.setState({ boxes: newBoxes });
  }

  onTileClick = e => {
    // step ++
    // 檢查是否和挖空相鄰（用矩陣），相鄰代表可移動
    // 如可移動，就 Target 跟 挖空 換位
    // cue 換位動畫（動畫時其他地方鎖起來以防 User 連續亂按）
    // 不可移動，就何も起こらない
    // 檢查是否破關
    console.log('Tile Clicked!', e);
  };

  checkSolved = e => {
    // 如果破關，cue 破關動畫（動畫時其他地方鎖起來以防 User 連續亂按）
    // isStart 變回 false，ReStart 變回 Start
    // 沒破關，何も起こらない
    console.log('Check Solved', e);
  };

  onStartClick = e => {
    // 檢查有無名字，有才能玩，沒有要跳 Popup 提醒
    // isStart 變 true，Start 要變 ReStart，遊戲進行中不可亂改名，所以 input 鎖起來
    // 出新題目 + shuffle 磁磚們
    this.setState({
      isStart: true,
      quiz: this.makeQuiz(),
    });
    console.log('Start Clicked!', e);
  };

  makeQuiz = e => {
    console.log('Make Quiz!', e);
    return 'https://source.unsplash.com/900x900/?cat,japan';
  };

  shuffle = e => {
    // 先洗牌（用 List）
    // 檢查 inversion 是基數還偶數（基數會破不了關，偶數才能破關）
    // 如果基數，List 前兩個人再換位，讓 inversion 變偶數
    // 重算矩陣
    console.log('Tiles Shuffle!', e);
  };

  render() {
    const { player, boxes, quiz, isStart } = this.state;
    return (
      <div className="game">
        <div className="game-info">
          <Info name={player.name} />
          <Info step={player.step} />
          <Info quiz={quiz} />
        </div>
        <Tiles list={boxes.list} onTileClick={this.onTileClick} />
        <Start isStart={isStart} onStartClick={this.onStartClick} />
        <Popup noticeMsg="喔喔喔111451" />
      </div>
    );
  }
}

export default Game;
