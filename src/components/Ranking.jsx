import React, { Component } from 'react';
import Firebase from '../Firebase';

class Ranking extends Component {
  state = {
    rankingList: [],
  };

  componentDidMount() {
    // 呼叫 firebase
  }

  render() {
    const { rankingList } = this.state;
    return (
      <div className='ranking'>
        <p>Top 10 Ranking</p>
        {rankingList.map((rank, i) => {
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
