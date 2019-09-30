import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  componentDidMount() {
    console.log(this.props.value.location);
  }

  checkTopTen = () => {
    const { playerStep } = this.state;
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
    }
    // 在圈外就何も起こらない
    console.log(ranking, last);
  };

  render() {
    const { ranking } = this.props;
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

Ranking.propTypes = {
  ranking: PropTypes.instanceOf(Array).isRequired,
};

export default Ranking;
