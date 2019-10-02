import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import db from '../Firebase';

class Ranking extends Component {
  state = {
    topTen: [],
    rankMsg: '',
  };

  componentDidMount() {
    const { ranking, location } = this.props;
    if (location.state) {
      const { playerName, playerStep } = location.state;
      this.checkRanking(playerName, playerStep);
    } else {
      this.sortRanking(ranking);
    }
  }

  componentDidUpdate(prevProps) {
    const { ranking } = this.props;
    // ranking 有變，排順序
    if (prevProps.ranking !== ranking) {
      this.sortRanking(ranking);
    }
  }

  componentWillUnmount() {
    // TODO: 移除監聽 firestore
  }

  deleteLast = async last => {
    const lastRef = await db
      .collection('ranking')
      .where('step', '==', `${last}`)
      .get();

    const batch = db.batch();

    // TODO: 有同分的刪後面那個。
    if (lastRef.size > 1) {
      lastRef.forEach((doc, i) => {
        console.log(i, lastRef.size - 1);
        if (i === parseInt(lastRef.size, 10) - 1) {
          batch.delete(doc.ref);
        }
      });
    } else {
      lastRef.forEach(doc => {
        batch.delete(doc.ref);
      });
    }

    await batch.commit();
  };

  addRank = (playerName, playerStep, last) => {
    const { ranking } = this.props;
    if (ranking.length >= 10) {
      // 如果會超出 10 名刪掉最後 1 名
      this.deleteLast(last);
    }
    db.collection('ranking').add({
      name: playerName,
      step: playerStep,
    });
  };

  sortRanking = ranking => {
    const topTen = ranking.sort((a, b) => {
      return a.step - b.step;
    });
    this.setState({ topTen });
  };

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
      this.addRank(playerName, playerStep, last);
      this.setState({ rankMsg: 'You are ranked ...!!' });
    } else {
      this.sortRanking(ranking);
      this.setState({ rankMsg: 'You are not ranking in top 10.' });
    }
  };

  render() {
    const { topTen, rankMsg } = this.state;
    return (
      <div className='ranking'>
        <p>Top 10 Ranking {rankMsg}</p>
        {topTen.map((rank, i) => {
          return (
            <div key={i} className='ranking-player'>
              <div className='ranking-rank'>{i + 1}</div>
              <div className='ranking-name'>{rank.name}</div>
              <div className='ranking-step'>{rank.step}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.instanceOf(Array).isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Ranking);
