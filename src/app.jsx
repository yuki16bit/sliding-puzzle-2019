import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import db from './Firebase';

import './App.scss';

import Game from './components/Game';
import Ranking from './components/Ranking';

class App extends Component {
  state = {
    quiz: '',
    photographer: '',
    photographerProfile: '',
    ranking: [],
  };

  componentDidMount() {
    this.forTest();
    // this.getQuiz();
    // 監聽 firestore
    this.getRanking();
  }

  componentWillUnmount() {
    // 移除監聽 firestore
  }

  forTest = () => {
    setTimeout(() => {
      this.setState({
        quiz: 'https://source.unsplash.com/270x270/?cat',
      });
    }, 1000);
  };

  // 用 axios 串接 Unsplash API 取得貓咪圖片作為拼圖題目
  getQuiz = async () => {
    const res = await axios.get('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      },
      params: {
        query: 'cat',
      },
    });
    const quiz = `${res.data.urls.raw}&w=270&h=270&fit=crop&crop=center`;
    const photographer = `${res.data.user.name}`;
    const photographerProfile = `${res.data.user.links.html}`;
    console.log(res.data);
    this.setState({ quiz, photographer, photographerProfile });
  };

  clearQuiz = () => {
    this.setState({ quiz: '' });
  };

  getRanking = () => {
    // firesote realtime updates
    db.collection('ranking').onSnapshot(querySnapshot => {
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
    const { quiz, photographerProfile, photographer, ranking } = this.state;
    return (
      <div className='app'>
        <p className='app-title'>Sliding Cat (Ф∀Ф)</p>
        <Router>
          <div className='nav'>
            <NavLink exact to='/' className='link' activeClassName='link-active'>
              Game
            </NavLink>
            <NavLink to='/ranking' className='link' activeClassName='link-active'>
              Ranking
            </NavLink>
          </div>
          <Route
            exact
            path='/'
            render={() => (
              <Game
                quiz={quiz}
                getQuiz={this.getQuiz}
                clearQuiz={this.clearQuiz}
                forTest={this.forTest}
                photographerProfile={photographerProfile}
                photographer={photographer}
              />
            )}
          />
          <Route path='/ranking' render={() => <Ranking ranking={ranking} />} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
