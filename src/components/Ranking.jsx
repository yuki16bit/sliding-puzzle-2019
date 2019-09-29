import React, { Component } from 'react';
import db from '../Firebase';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    // 監聽 firestore
    this.getRanking();
  }

  componentWillUnmount() {
    // 移除監聽 firestore
  }

  getRanking = () => {
    // firesote realtime updates
    db.collection('ranking')
      // .where('step', '>=', '0')
      .onSnapshot(querySnapshot => {
        // 在這層 setState 以解決 onSnapshot 非同步的問題。
        const ranking = [];
        querySnapshot.forEach(doc => {
          const player = doc.data();
          ranking.push({
            name: player.name,
            step: player.step,
          });
        });
        this.setState({ ranking });
      });
  };

  render() {
    const { ranking } = this.state;
    return (
      <div className='ranking'>
        <p>Top 10 Ranking</p>
        {ranking.map((rank, i) => {
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

export default Ranking;
