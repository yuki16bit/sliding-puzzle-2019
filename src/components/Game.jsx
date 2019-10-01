import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    isSolved: false,
    isPop: false,
    noticeMsg: '',
    clickOutside: true,

    // Player Data
    playerName: '',
    playerStep: '0',

    // Input Control
    isLock: false,
    placeholder: 'Your Name...',

    // tiles Data
    tilesRow: 3,
    tilesCol: 3,
    tilesSize: 0,
    tilesList: [],
    tilesMatrix: [],
  };

  componentDidMount() {
    const { tilesRow, tilesCol } = this.state;
    this.initSize(tilesRow, tilesCol);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isStart, tilesCol, tilesRow, tilesSize, tilesList } = this.state;
    if (prevState.tilesSize !== tilesSize) {
      this.initList(tilesSize);
    }
    if (isStart && prevState.tilesList !== tilesList) {
      this.initMatrix(tilesRow, tilesCol, tilesList);
      // 檢查是否破關
      this.checkSolved();
    }
    if (prevState.isStart !== isStart) {
      this.toggleIsLock();
    }
  }

  findCoord = val => {
    const { tilesMatrix } = this.state;
    for (let i = 0; i < tilesMatrix.length; i += 1) {
      for (let j = 0; j < tilesMatrix.length; j += 1) {
        if (tilesMatrix[i][j] === parseInt(val, 10)) {
          return { x: i, y: j };
        }
      }
    }
    return -1;
  };

  canSwap = tile => {
    const tileX = this.findCoord(tile).x;
    const tileY = this.findCoord(tile).y;
    const gapX = this.findCoord(9).x;
    const gapY = this.findCoord(9).y;
    return Math.abs(tileX - gapX) + Math.abs(tileY - gapY) === 1;
  };

  swap = val => {
    const { tilesList } = this.state;
    const swapList = [...tilesList];
    const tile = swapList.indexOf(parseInt(val, 10));
    const gap = swapList.indexOf(9);
    const tmp = swapList[tile];
    swapList[tile] = swapList[gap];
    swapList[gap] = tmp;
    this.setState({ tilesList: swapList });
  };

  // calcDistance = ({ x, y }) => {
  //   return {
  //     xMove: x * 100,
  //     yMove: y * 100,
  //   };
  // };

  clickTile = e => {
    const { isStart } = this.state;
    if (isStart) {
      const val = e.currentTarget.value;
      // 檢查是否和挖空相鄰（用矩陣），相鄰代表可移動
      if (this.canSwap(val)) {
        // 如可移動，就 Target 跟 挖空 換位
        // cue 換位動畫（動畫時其他地方鎖起來以防 User 連續亂按）
        this.swap(val);
        // step ++
        this.setState(prevState => {
          return { playerStep: `${parseInt(prevState.playerStep, 10) + 1}` };
        });
        // 不可移動，就何も起こらない
      }
    }
  };

  checkSolved = () => {
    const { tilesList, playerName, playerStep } = this.state;
    const { history, calcCombo } = this.props;
    const ideal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (tilesList.join() === ideal.join()) {
      calcCombo();
      this.setState(
        {
          isStart: false,
          isSolved: true,
          isPop: true,
          clickOutside: false,
          noticeMsg: 'Congratulations! You won!',
        },
        () => {
          setTimeout(() => {
            history.push({
              pathname: '/ranking',
              state: { playerName, playerStep },
            });
          }, 1000);
        },
      );
    }
  };

  clickStart = () => {
    // 檢查有無名字，有才能玩，沒有要跳 Popup 提醒
    const { playerName } = this.state;
    if (!playerName || playerName === '') {
      this.setState({
        isPop: true,
        noticeMsg: 'Please enter your name to start the game.',
      });
    } else {
      // isStart 變 true，isSolved 要變 false
      this.setState({
        isStart: true,
        isSolved: false,
        playerStep: '0',
      });
      // shuffle 磁磚們
      this.shuffleTiles();
    }
  };

  toggleIsPop = () => {
    this.setState(prevState => {
      return { isPop: !prevState.isPop };
    });
  };

  toggleIsLock = () => {
    this.setState(prevState => {
      return { isLock: !prevState.isLock };
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

  isSolvable = list => {
    let inversions = 0;
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        if (list[i] > list[j]) {
          inversions += 1;
        }
      }
    }
    console.log('inversions: ', inversions);
    return inversions % 2 === 0;
  };

  shuffleTiles = () => {
    const { tilesList } = this.state;
    // 先洗牌
    const newtilesList = this.fisherYates([...tilesList]);
    // 檢查 inversion 是基數還偶數（基數會破不了關，偶數才能破關）
    if (!this.isSolvable(newtilesList)) {
      // 如果基數，List 前兩個人再換位，讓 inversion 變偶數
      const tmp = newtilesList[0];
      newtilesList[0] = newtilesList[1];
      newtilesList[1] = tmp;
      this.isSolvable(newtilesList);
      this.setState({ tilesList: newtilesList });
    } else {
      this.setState({ tilesList: newtilesList });
    }
  };

  blurInput = () => {
    const { playerName } = this.state;
    if (!playerName || playerName === '') {
      this.setState({ placeholder: 'Your Name...' });
    }
  };

  focusInput = () => {
    this.setState({ placeholder: '' });
  };

  changeName = e => {
    this.setState({
      playerName: e.target.value.toString(),
    });
  };

  initSize = (row, col) => {
    const size = row * col;
    this.setState({ tilesSize: size });
  };

  initList = size => {
    const list = Array.from({ length: size }, (v, i) => i + 1);
    this.setState({ tilesList: list });
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

    this.setState({ tilesMatrix: twoD });
  };

  render() {
    const {
      isStart,
      isPop,
      noticeMsg,
      clickOutside,
      placeholder,
      playerStep,
      isLock,
      tilesList,
    } = this.state;
    const { quiz, photographerProfile, photographer } = this.props;
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
        <Tiles isStart={isStart} tilesList={tilesList} clickTile={this.clickTile} quiz={quiz} />
        <p className='game-credit'>
          Photo by{' '}
          <a href={photographerProfile} target='_blank' rel='noopener noreferrer'>
            {photographer}
          </a>{' '}
          on{' '}
          <a href='https://unsplash.com' target='_blank' rel='noopener noreferrer'>
            Unsplash
          </a>
        </p>
        <Start isStart={isStart} clickStart={this.clickStart} />
        <Popup
          isPop={isPop}
          noticeMsg={noticeMsg}
          toggleIsPop={this.toggleIsPop}
          clickOutside={clickOutside}
        />
      </div>
    );
  }
}

Game.propTypes = {
  calcCombo: PropTypes.func.isRequired,
  quiz: PropTypes.string.isRequired,
  photographerProfile: PropTypes.string.isRequired,
  photographer: PropTypes.string.isRequired,
  forTest: PropTypes.func.isRequired,
  getQuiz: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Game);
