import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import db from '../Firebase';

class Ranking extends Component {
  state = {
    topTen: [],
    rankMsg: '',
  }

  componentDidMount() {
    const { ranking, location } = this.props;
    if (location.state) {
      const playerName = location.state.playerName;
      const playerStep = location.state.playerStep;
      this.checkRanking(playerName, playerStep);
    } else {
      this.sortRanking(ranking);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { ranking } = this.props;
    const { topTen } = this.state;
    // ranking 有變，排順序
    if(prevProps.ranking !== ranking && ranking.length >= 10) {
      this.sortRanking(ranking);
      console.log(topTen);
    }
  }

  componentWillUnmount() {
    // 移除監聽 firestore
  }

  addRank = (playerName, playerStep) => {
    const { ranking } = this.props;
    if (ranking.length >= 10) {
      // 如果會超出 10 名刪掉最後 1 名
      // db.collection('ranking').where('step','==',`${topTen[9].step}`).get().delete()
      //   .then(console.log('delete last!'))
      //   .catch( err => console.log(err))
      console.log('超出 10 名要處理');
    }
    db.collection('ranking').add({
      name: playerName,
      step: playerStep
    })
  }

  sortRanking = (ranking) => {
    const topTen = ranking.sort((a, b) => {
      return a.step - b.step;
    });
    this.setState({ topTen });
  }

  checkRanking = (playerName, playerStep) => {
    const { ranking } = this.props;
    const last = ranking
      .map(player => {
        return player.step;
      })
      .reduce((acc, cur) => {
        return Math.max(acc, cur);
      });
    // 如果進前 10
    if (playerStep < last) {
      // 寫入 firestore
      this.addRank(playerName, playerStep);
      this.setState({ rankMsg: 'You are ranked ...!!' });
      console.log('有前10');
    } else {
      this.setState({ rankMsg: 'You are not ranking in top 10.' });
      console.log('圈外');
    }
    console.log(playerStep, last);
  };

  render() {
    const { topTen, rankMsg } = this.state;
    return (
      <div className='ranking'>
        <p>Top 10 Ranking</p>
        <p>{rankMsg}</p>
        {topTen.map((rank, i) => {
          return (
            <dl key={i}>
              <dt>{i + 1}</dt>
              <dd>{rank.name}</dd>
              <dd>{rank.step}</dd>
            </dl>
          );
        })}
      </div>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.instanceOf(Array).isRequired,
}

export default withRouter(Ranking);
