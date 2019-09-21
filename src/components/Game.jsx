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
    playerName: '',
    playerStep: '0',

    // Input Control
    isLock: false,
    placeholder: 'Please Enter Your Name...',

    // Boxes Data
    boxesRow: 3,
    boxesCol: 3,
    boxesSize: 0,
    boxesList: [],
    boxesMatrix: [],
  };

  componentDidMount() {
    const { boxesRow, boxesCol } = this.state;
    this.initSize(boxesRow, boxesCol);
  }

  componentDidUpdate(prevProps, prevState) {
    const { boxesCol, boxesRow, boxesSize, boxesList } = this.state;
    if (prevState.boxesSize !== boxesSize) {
      this.initList(boxesSize);
      console.log('initList');
    }
    if (prevState.boxesList !== boxesList) {
      this.initMatrix(boxesRow, boxesCol, boxesList);
      console.log('initMatrix!');
    }
  }

  clickTile = () => {
    const { isStart } = this.state;
    if (isStart) {
      // step ++
      this.setState(prevState => {
        return { playerStep: `${parseInt(prevState.playerStep, 10) + 1}` };
      });
      // 檢查是否和挖空相鄰（用矩陣），相鄰代表可移動
      // 如可移動，就 Target 跟 挖空 換位
      // cue 換位動畫（動畫時其他地方鎖起來以防 User 連續亂按）
      // 不可移動，就何も起こらない
      // 檢查是否破關
      console.log('Tile Clicked!');
    }
  };

  checkSolved = e => {
    // 如果破關，cue 破關動畫（動畫時其他地方鎖起來以防 User 連續亂按）
    // isStart 變回 false，ReStart 變回 Start
    // 沒破關，何も起こらない
    console.log('Check Solved', e);
  };

  clickStart = () => {
    // 檢查有無名字，有才能玩，沒有要跳 Popup 提醒
    const { playerName } = this.state;
    if (!playerName || playerName === '') {
      this.setState({
        isPop: true,
      });
    } else {
      // isStart 變 true，Start 要變 ReStart
      this.setState({
        isStart: true,
        playerStep: '0',
      });
      // 出新題目 + shuffle 磁磚們
      this.shuffleTiles();
    }
    console.log('Start Clicked!');
  };

  toggleIsPop = () => {
    this.setState(prevState => {
      return { isPop: !prevState.isPop };
    });
  };

  fisherYates = list => {
    const newList = [...list];
    for (let i = newList.length - 1; i > 0; i -= 1) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = newList[i];
      newList[i] = newList[r];
      newList[r] = tmp;
    }
    return newList;
  };

  shuffleTiles = () => {
    const { boxesList } = this.state;
    // 先洗牌
    const newBoxesList = this.fisherYates([...boxesList]);
    // 檢查 inversion 是基數還偶數（基數會破不了關，偶數才能破關）
    // 如果基數，List 前兩個人再換位，讓 inversion 變偶數
    this.setState({ boxesList: newBoxesList });
    console.log('Tiles Shuffle!');
  };

  blurInput = () => {
    const { playerName } = this.state;
    if (!playerName || playerName === '') {
      this.setState({ placeholder: 'Please Enter Your Name...' });
    }
  };

  focusInput = () => {
    this.setState({ placeholder: '' });
  };

  changeName = e => {
    const { isStart } = this.state;
    if (isStart) {
      // 遊戲進行中不可亂改名，所以 input 鎖起來
      this.setState({ isLock: true });
    } else {
      this.setState({
        isLock: false,
        playerName: e.target.value,
      });
    }
  };

  initSize = (row, col) => {
    const size = row * col;
    this.setState({ boxesSize: size });
  };

  initList = size => {
    const list = Array.from({ length: size }, (v, i) => i + 1);
    this.setState({ boxesList: list });
  };

  initMatrix = (row, col, list) => {
    const oneD = [...list];
    const twoD = [];

    let rowNum = row > 0 ? row : 0;

    while (rowNum && oneD.length > 0) {
      rowNum -= 1;
      const chunk = oneD.splice(0, col);
      twoD.push(chunk);
    }

    this.setState({ boxesMatrix: twoD });
  };

  render() {
    const { isStart, isPop, quiz, placeholder, playerStep, isLock, boxesList } = this.state;
    return (
      <div className='game'>
        <div className='game-info'>
          <Info
            changeName={this.changeName}
            placeholder={placeholder}
            blurInput={this.blurInput}
            focusInput={this.focusInput}
            isLock={isLock}
          />
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
