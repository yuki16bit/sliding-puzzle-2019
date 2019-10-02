import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { db, firebase } from '../Firebase';

class Ranking extends Component {
  state = {
    rankMsg: '',
  };

  componentDidMount() {
    const { location } = this.props;
    if (location.state) {
      const { playerName, playerStepNum } = location.state;
      this.checkRanking(playerName, playerStepNum);
    }
  }

  componentDidUpdate(prevProps) {
    const { ranking } = this.props;
    if (prevProps.ranking !== ranking) {
      if (ranking.length > 10) {
        // 超出 10 名，刪掉最後一名
        this.deleteLast();
      }
    }
  }

  componentWillUnmount() {
    // TODO: 移除監聽 firestore
  }

  deleteLast = async () => {
    const { ranking } = this.props;
    const last = ranking[ranking.length - 1];
    const lastRef = await db
      .collection('ranking')
      .where('step', '==', `${last.step}`)
      .get();

    const batch = db.batch();

    if (lastRef.size > 1) {
      // TODO: 有同分的人，要刪掉慢到的
      console.log(lastRef);
    } else {
      lastRef.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    await batch.commit();
  };

  addRank = (playerName, playerStepNum) => {
    db.collection('ranking').add({
      name: playerName,
      step: playerStepNum,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  checkRanking = (playerName, playerStepNum) => {
    const { ranking } = this.props;
    const last = ranking[ranking.length - 1];
    // 如果進前 10
    if (playerStepNum < last.step) {
      // 寫入 firestore
      this.addRank(playerName, playerStepNum);
      this.setState({ rankMsg: 'You are one of the top 10 ...!!' });
    } else {
      this.setState({ rankMsg: 'You are not ranking in top 10.' });
    }
  };

  render() {
    const { rankMsg } = this.state;
    const { ranking } = this.props;
    return (
      <div className='ranking'>
        {/* <p>Top 10 Ranking</p> */}
        <p>{rankMsg}</p>
        {ranking.map((rank, i) => {
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
