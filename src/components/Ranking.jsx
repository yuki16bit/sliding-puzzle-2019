import React, { Component } from 'react';
import { db } from '../firebase';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.getRanking();
  }

  // firestore
  getRanking = () => {
    // listen realtime updates
    // realtime updates 要把 onSnapshot 回傳的東東放在 Promise 裡解決非同步問題。
    let ranking = [];
    db.collection('ranking').where('step', '>=', '0')
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log("Current data: ", doc.data());
        ranking.push(doc.data());
      });
    });
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className='ranking'>
        <p>Top 10 Ranking</p>
        {ranking.map((rank, i) => {
          return (
            <div key={i} className='ranking-list'>
              {rank.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Ranking;
