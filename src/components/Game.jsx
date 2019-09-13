import React, { Component } from 'react';

// UI
import Popup from './handmade/Popup';

// Logic
import Info from './Info';
import Tiles from './Tiles';
import Start from './Start';

class Game extends Component {
  state = {
    // Game Data
    isStart: false,
    isPop: false,
    quiz: 'https://source.unsplash.com/900x900/?cat,sakura',

    // Player Data
    playerName: 'Please Enter Your Name...',
    playerStep: '0',

    // Boxes Data
    boxesRow: 3,
    boxesCol: 3,
    boxesSize: 0,
    boxesList: [],
    boxesMatrix: [],
  };

  componentDidMount() {
    const { boxesRow, boxesCol } = this.state;
    this.getBoxes(boxesRow, boxesCol);
  }

  getBoxes(row, col) {
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

    this.setState({
      boxesSize: size,
      boxesList: list,
      boxesMatrix: twoD,
    });
  }

  clickTile = e => {
    // step ++
    this.setState(prevState => {
      return { playerStep: `${parseInt(prevState.playerStep, 10) + 1}` };
    });
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

  clickStart = e => {
    const { playerName } = this.state;
    if (!playerName || playerName === 'Please Enter Your Name...') {
      this.setState({
        isPop: true,
      });
    } else {
      this.setState({
        isStart: true,
      });
    }

    // 檢查有無名字，有才能玩，沒有要跳 Popup 提醒
    // isStart 變 true，Start 要變 ReStart，遊戲進行中不可亂改名，所以 input 鎖起來
    // 出新題目 + shuffle 磁磚們
    console.log('Start Clicked!', e);
  };

  toggleIsPop = () => {
    this.setState(prevState => {
      return { isPop: !prevState.isPop };
    });
  };

  shuffleTiles = e => {
    // 先洗牌（用 List）
    // 檢查 inversion 是基數還偶數（基數會破不了關，偶數才能破關）
    // 如果基數，List 前兩個人再換位，讓 inversion 變偶數
    // 重算矩陣
    console.log('Tiles Shuffle!', e);
  };

  changeName = e => {
    this.setState({ playerName: e.target.value });
  };

  render() {
    const { isStart, isPop, quiz, playerName, playerStep, boxesList } = this.state;
    return (
      <div className='game'>
        <div className='game-info'>
          <Info playerName={playerName} changeName={this.changeName} />
          <Info playerStep={playerStep} />
          <Info quiz={quiz} />
        </div>
        <Tiles isStart={isStart} boxesList={boxesList} clickTile={this.clickTile} />
        <Start isStart={isStart} clickStart={this.clickStart} />
        <Popup isPop={isPop} toggleIsPop={this.toggleIsPop} />
      </div>
    );
  }
}

export default Game;
